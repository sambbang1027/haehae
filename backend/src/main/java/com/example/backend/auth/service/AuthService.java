package com.example.backend.auth.service;

import com.example.backend.auth.dto.LoginRequestDTO;
import com.example.backend.auth.dto.TokenResponseDTO;
import com.example.backend.auth.dto.UserMeResponseDTO;
import com.example.backend.entity.user.User;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.example.backend.entity.user.User.Status.BLOCKED;
import static com.example.backend.entity.user.User.Status.INACTIVE;

@Transactional
@RequiredArgsConstructor
@Service
@Slf4j
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

     if(user.getStatus().equals(INACTIVE)){
        throw new HaehaeException(ErrorCode.INACTIVE_USER);
     } else if (user.getStatus().equals(BLOCKED)) {
         throw new HaehaeException(ErrorCode.BLOCKED_USER);
     }
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
        log.info("✅ RefreshToken Redis 저장: key = {}, value = {}", "refresh:" + refreshToken, user.getId());

        return response;
    }

    // 비밀번호 매칭
    public void matchingPassword(String rawPassword, String encodedPassword){
        if(!passwordEncoder.matches(rawPassword,encodedPassword)){
            throw new HaehaeException(ErrorCode.PASSWORD_NOT_MATCH);
        }
    }

   public UserMeResponseDTO myInfo(Long userId){
       User user = userRepository.findById(userId)
                .orElseThrow(()-> new HaehaeException(ErrorCode.USER_NOT_FOUND));

       return UserMeResponseDTO.builder()
               .userId(user.getId())
               .email(user.getEmail())
               .nickname(user.getNickname())
               .profileImage(user.getProfileImageUrl())
               .role(user.getRole())
               .build();
   }
}
