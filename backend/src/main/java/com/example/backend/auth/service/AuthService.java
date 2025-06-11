package com.example.backend.auth.service;

import com.example.backend.auth.dto.LoginRequestDTO;
import com.example.backend.auth.dto.TokenResponseDTO;
import com.example.backend.entity.user.User;
import com.example.backend.entity.user.UserToken;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RequiredArgsConstructor
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserTokenService userTokenService;

    // login
    public TokenResponseDTO login (LoginRequestDTO loginRequestDTO){
     // 유저 존재 확인
     User user = userRepository.findByEmail(loginRequestDTO.getEmail())
             .orElseThrow(()-> new HaehaeException(ErrorCode.USER_NOT_FOUND));

     // 비밀번호 일치 검증
        matchingPassword(loginRequestDTO.getPassword(),user.getPasswordHash());

     // 토큰 생성
        String accessToken = jwtTokenProvider.createAccessToken(user.getId());
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getId());

     // refreshToken 저장
        userTokenService.saveOrUpdateRefreshToken
                (user.getId(), refreshToken, jwtTokenProvider.getExpiration(refreshToken));

        // 응답 DTO 변환
        TokenResponseDTO response = TokenResponseDTO.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

        return response;
    }

    // 비밀번호 매칭
    public void matchingPassword(String rawPassword, String encodedPassword){
        if(!passwordEncoder.matches(rawPassword,encodedPassword)){
            throw new HaehaeException(ErrorCode.PASSWORD_NOT_MATCH);
        }
    }

    //Token 재발행
    public TokenResponseDTO reissueToken(String refreshToken){
        // 토큰 유효성 검증
        if(!jwtTokenProvider.vaildateToken(refreshToken)){
            throw new HaehaeException(ErrorCode.INVALID_TOKEN);
        }
        // 사용자 정보 추출
        Long userId = jwtTokenProvider.getUserIdFromToken(refreshToken);

        // 토큰 DB 일치 검증
        String storedToken = userTokenService.getRefreshToken(userId);

        if(! refreshToken.equals(storedToken)){
            throw new HaehaeException(ErrorCode.REFRESH_TOKEN_NOT_MATCH);
        }

        // 토큰 재발행
        String accessToken = jwtTokenProvider.createAccessToken(userId);
        String refresh = jwtTokenProvider.createRefreshToken(userId);

        //refresh token 업데이트
        userTokenService.saveOrUpdateRefreshToken(userId,refresh,jwtTokenProvider.getExpiration(refresh));

        //반환
        return TokenResponseDTO.builder()
                .accessToken(accessToken)
                .refreshToken(refresh)
                .build();

    }
}
