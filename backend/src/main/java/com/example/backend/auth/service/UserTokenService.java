package com.example.backend.auth.service;

import com.example.backend.auth.dto.TokenResponseDTO;
import com.example.backend.auth.repository.UserTokenRepository;
import com.example.backend.entity.user.UserToken;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Date;

@Transactional
@RequiredArgsConstructor
@Service
public class UserTokenService{

    private final UserTokenRepository userTokenRepository;
    private final JwtTokenProvider jwtTokenProvider;

    //저장 | 갱신
    public void saveOrUpdateRefreshToken(Long userId, String token, Date expiresAt) {
        Timestamp expiry = new Timestamp(expiresAt.getTime());
        UserToken refreshToken = userTokenRepository.findByUserId(userId)
                .map(existing -> {
                    existing.updateToken(token,expiry);
                    return existing;
                })
                .orElse(UserToken.builder()
                        .userId(userId)
                        .refreshToken(token)
                        .expiresAt(expiry)
                        .build());

        userTokenRepository.save(refreshToken);
    }

    // 삭제 (로그아웃)
    public void deleteByUserId(Long userId){
        userTokenRepository.deleteByUserId(userId);
    }

    // refreshToken 조회
    public String getRefreshToken(Long userId){
        return  userTokenRepository.findByUserId(userId)
                .orElseThrow(() -> new HaehaeException(ErrorCode.REFRESH_TOKEN_NOT_FOUND))
                .getRefreshToken();
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
        String storedToken = getRefreshToken(userId);

        if(! refreshToken.equals(storedToken)){
            throw new HaehaeException(ErrorCode.REFRESH_TOKEN_NOT_MATCH);
        }

        // 토큰 재발행
        String accessToken = jwtTokenProvider.createAccessToken(userId);
        String refresh = jwtTokenProvider.createRefreshToken(userId);

        //refresh token 업데이트
        saveOrUpdateRefreshToken(userId,refresh,jwtTokenProvider.getExpiration(refresh));

        //반환
        return TokenResponseDTO.builder()
                .accessToken(accessToken)
                .refreshToken(refresh)
                .build();

    }

}
