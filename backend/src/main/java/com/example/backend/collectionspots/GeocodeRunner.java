package com.example.backend.collectionspots;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class GeocodeRunner implements ApplicationRunner {

    private final CollectionSpotService collectionSpotService;

    // 앱 실행 시 자동 호출
    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("🛫 GeocodeRunner 시작: geocodeAndUpdateAllSpots 호출");
        collectionSpotService.geocodeAndUpdateAllSpots();
        log.info("🛬 GeocodeRunner 완료");
    }

}
