package com.example.backend.auth.service;

import com.example.backend.auth.dto.GoogleResponse;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.user.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;

import java.security.GeneralSecurityException;


@RequiredArgsConstructor
@Service
public class GoogleService {

    private final GoogleIdTokenVerifier googleIdTokenVerifier;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public GoogleResponse googleLogin(String idToken){
        try{

            System.out.println("service : 구글 로그인 비즈니스 로직 시작 ");
            GoogleIdToken token = googleIdTokenVerifier.verify(idToken);
            if (token == null) throw new HaehaeException(ErrorCode.INVALID_TOKEN);

            Payload payload = token.getPayload();

            System.out.println("payload 데이터 확인 : "+ payload);

            GoogleResponse response = GoogleResponse.builder()
                    .sub(payload.getSubject())
                    .email(payload.getEmail())
                    .emailVerified(payload.getEmailVerified())
                    .name((String) payload.get("name"))
                    .build();
            return response;
        }catch (GeneralSecurityException | IOException e){
            throw new HaehaeException(ErrorCode.GOOGLE_VERIFY_FAILED);
        }

    }

}
