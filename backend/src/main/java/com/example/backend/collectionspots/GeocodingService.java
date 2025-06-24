package com.example.backend.collectionspots;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class GeocodingService {

    private final WebClient webClient;

    @Value("${kakao.rest-key}")
    private String restKey;

    // 생성자 주입
    public GeocodingService(WebClient.Builder builder) {
        this.webClient = builder.baseUrl("https://dapi.kakao.com").build();
    }


    // 1번째 검색 후 결과 반환 함수.
    // 주소 문자열을 받아 위도, 경도, 행정동 코드를 담은 GeoData 객체를 Optional 로 반환.
    public Optional<GeoData> geocode(String address) {
        KakaoRes res = webClient.get() // WebClient 인스턴스를 통해 GET 요청 준비.
                .uri(uriBuilder -> uriBuilder
                        .path("/v2/local/search/address.json") // 경로
                        .queryParam("query", address) // 쿼리 파라미터
                        .queryParam("analyze_type", "similar") // 결과 없을 시 유사 주소 출력
                        .build())
                .header("Authorization", "KakaoAK " + restKey) // HTTP 헤더에 REST API 키를 추가
                .retrieve() // 서버 응답(response) 가져옴.
                .bodyToMono(KakaoRes.class) // 본문을 KakaoRes DTO로 비동기 매핑
                .block(); // 비동기 결과를 동기(Mono -> 실제 객체)로 기다렸다가 리턴, 만약 네트워크 오류 또는 4../5.. 에라가 나면 예외 발생.

        // Kakao API 응답 확인용 로그
        ObjectMapper mapper = new ObjectMapper();
        try {
            System.out.println("📦 Kakao API 응답 전체 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓");
            System.out.println(mapper.writerWithDefaultPrettyPrinter().writeValueAsString(res));
            System.out.println("📦 Kakao API 응답 끝 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑");
        } catch (Exception e) {
            System.out.println("❌ Kakao 응답 출력 실패: " + e.getMessage());
        }



        if (res == null || res.getDocuments().isEmpty()) {
            return Optional.empty();
        }
        KakaoRes.Document doc = res.getDocuments().get(0); // Document 중 첫번째 요소 선택
        String regionCode = null;

        // 10자리 행정동 코드 뽑기
        if (doc.getAddress() != null && doc.getAddress().getH_code() != null) {
            regionCode = doc.getAddress().getH_code();
        }

        log.info("🧭 h_code (행정동 코드): {}", regionCode);

        return Optional.of(new GeoData(
                Double.parseDouble(doc.getY()), // 위도 (문자열 -> double 변환)
                Double.parseDouble(doc.getX()),
                regionCode
        )); // 값들을 담은 GeoData 레코드를 Optional.of(...) 로 감싸서 반환.

    }

    // 변환 결과를 담는 내부 DTO
    public static record GeoData(
            double lat, // 위도
            double lng, // 경도
            String regionCode // 10자리 행정동 코드
    ) {}

    // Kakao 주소 검색 API 응답 바인딩용 DTO
    public static class KakaoRes {
        private List<Document> documents;
        public List<Document> getDocuments() { return documents; }
        public void setDocuments(List<Document> documents) { this.documents = documents; }

        public static class Document {
            private String x;
            private String y;
            private Address address;

            public String getX() { return x; }
            public void setX(String x) { this.x = x; }

            public String getY() { return y; }
            public void setY(String y) { this.y = y; }

            public Address getAddress() { return address; }
            public void setAddress(Address address) { this.address = address; }
        }

        public static class Address {
            private String h_code;  // 실제 응답 필드 이름

            public String getH_code() {
                return h_code;
            }

            public void setH_code(String h_code) {
                this.h_code = h_code;
            }
        }
    }

}
