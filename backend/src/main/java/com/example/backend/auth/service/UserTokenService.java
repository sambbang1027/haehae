package com.example.backend.auth.service;

import com.example.backend.auth.repository.UserTokenRepository;
import com.example.backend.entity.user.UserToken;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;

@Transactional
@RequiredArgsConstructor
@Service
public class UserTokenService{

    private final UserTokenRepository userTokenRepository;

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
}
