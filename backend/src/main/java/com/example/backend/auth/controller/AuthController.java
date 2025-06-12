package com.example.backend.auth.controller;

import com.example.backend.auth.dto.LoginRequestDTO;
import com.example.backend.auth.dto.TokenResponseDTO;
import com.example.backend.auth.service.AuthService;
import com.example.backend.auth.service.UserTokenService;
import com.example.backend.entity.user.User;
import com.example.backend.entity.user.UserToken;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/auth")
@RestController
public class AuthController {
    private final AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<TokenResponseDTO>login(@RequestBody  LoginRequestDTO requestDTO){
        TokenResponseDTO response = authService.login(requestDTO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponseDTO> reissueToken (@RequestHeader("Refresh-Token") String refreshToken){
        TokenResponseDTO response = authService.reissueToken(refreshToken);
        return ResponseEntity.ok(response);
    }

//    @DeleteMapping("/logout")
//    public ResponseEntity<Void> logout (@AuthenticationPrincipal ){
//
//    }
}
