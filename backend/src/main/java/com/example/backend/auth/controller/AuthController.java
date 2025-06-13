package com.example.backend.auth.controller;

import com.example.backend.auth.dto.LoginRequestDTO;
import com.example.backend.auth.dto.TokenResponseDTO;
import com.example.backend.auth.dto.UserMeResponseDTO;
import com.example.backend.auth.service.AuthService;
import com.example.backend.auth.service.UserTokenService;
import com.example.backend.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/auth")
@RestController
public class AuthController {
    private final AuthService authService;
    private final UserTokenService userTokenService;


    @PostMapping("/login")
    public ResponseEntity<TokenResponseDTO>login(@RequestBody  LoginRequestDTO requestDTO){
        System.out.println("받은 이메일: " + requestDTO.getEmail());
        System.out.println("받은 비밀번호: " + requestDTO.getPassword());

        TokenResponseDTO response = authService.login(requestDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<UserMeResponseDTO> myInfo(@AuthenticationPrincipal CustomUserDetails userDetails){
        UserMeResponseDTO response  = authService.myInfo(userDetails.getId());;
        return ResponseEntity.ok(response);
    }



    @PostMapping("/refresh")
    public ResponseEntity<TokenResponseDTO> reissueToken (@RequestHeader("Refresh-Token") String refreshToken){
        TokenResponseDTO response = userTokenService.reissueToken(refreshToken);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout (@AuthenticationPrincipal CustomUserDetails userDetails){
        userTokenService.deleteByUserId(userDetails.getId());
        return ResponseEntity.noContent().build();

    }
}
