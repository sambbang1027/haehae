package com.example.backend.security;

import com.example.backend.entity.user.User;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    // email 로 사용자 정보 추출 (로그인 시)
    @Override
    public UserDetails loadUserByUsername(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new HaehaeException(ErrorCode.USER_NOT_FOUND));
        return new CustomUserDetails(user);
    }

    // userId 로 사용자 정보 추출 (JWT 토큰 filter)
    public UserDetails loadUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new HaehaeException(ErrorCode.USER_NOT_FOUND));
        return new CustomUserDetails(user);
    }
}
