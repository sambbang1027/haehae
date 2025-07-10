package com.example.backend.auth.controller;

import com.example.backend.auth.dto.*;
import com.example.backend.auth.service.AuthService;
import com.example.backend.auth.service.GoogleService;
import com.example.backend.auth.service.KakaoAuthService;
import com.example.backend.auth.service.UserTokenService;
import com.example.backend.common.response.HaehaeResponse;
import com.example.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RequiredArgsConstructor
@RequestMapping("/api/auth")
@RestController
public class AuthController {
    private final AuthService authService;
    private final UserTokenService userTokenService;
    private final KakaoAuthService kakaoAuthService;
    private final GoogleService googleService;


    // 로그인
    @PostMapping("/login")
    public ResponseEntity<HaehaeResponse<TokenResponseDTO>>login(@RequestBody  LoginRequestDTO requestDTO){
        System.out.println("받은 이메일: " + requestDTO.getEmail());
        System.out.println("받은 비밀번호: " + requestDTO.getPassword());

        TokenResponseDTO response = authService.login(requestDTO);
        return ResponseEntity.ok(HaehaeResponse.ok(response));
    }

    // 내 정보 호출
    @GetMapping("/me")
    public ResponseEntity<HaehaeResponse<UserMeResponseDTO>> myInfo(@AuthenticationPrincipal CustomUserDetails userDetails){
        UserMeResponseDTO response  = authService.myInfo(userDetails.getId());;
        return ResponseEntity.ok(HaehaeResponse.ok(response));
    }


    // 리프레시토큰 재발행
    @PostMapping("/refresh")
    public ResponseEntity<HaehaeResponse<TokenResponseDTO>> reissueToken (@RequestHeader("Refresh-Token") String refreshToken){
        TokenResponseDTO response = userTokenService.reissueToken(refreshToken);
        return ResponseEntity.ok(HaehaeResponse.ok(response));
    }

    // 자동로그인 access Token 검증 및 유저정보 담아 보내기
    @GetMapping("/validate")
    public ResponseEntity<HaehaeResponse<UserMeResponseDTO>> validateToken(@AuthenticationPrincipal CustomUserDetails userDetails) {
        UserMeResponseDTO response = authService.myInfo(userDetails.getId());
        return ResponseEntity.ok(HaehaeResponse.ok(response));
    }

    // 로그아웃
    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout (@AuthenticationPrincipal CustomUserDetails userDetails){
        userTokenService.deleteByUserId(userDetails.getId());
        return ResponseEntity.noContent().build();

    }


    // 카카오 로그인
    @PostMapping("/social/kakao")
    public Mono<ResponseEntity<KaKaoResponse>> socialLogin(@RequestBody KakaoRequest kakaoRequest){
        String accessToken = kakaoRequest.getAccessToken();
        // String provider = kakaoRequest.getProvider();

           return kakaoAuthService.getKakaoProfile(accessToken)
                   .map(user -> ResponseEntity.ok(user));
    }

    @PostMapping("/social/google")
    public ResponseEntity<GoogleResponse> googleLogin (@RequestBody GoogleRequest googleRequest){
        System.out.println("controller : google login start");
        GoogleResponse response = googleService.googleLogin(googleRequest.getIdToken());
        System.out.println("controller : 서비스단으로부터 받아온 값 : "+ response);
            return ResponseEntity.ok(response);
    }
}
