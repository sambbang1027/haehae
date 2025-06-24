package com.example.backend.user.controller;

import com.example.backend.user.dto.LocalRegisterDTO;
import com.example.backend.user.service.LocalUserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final LocalUserServiceImpl localAuthService;

    @PostMapping("/register/local")
    public ResponseEntity<String> localRegister(@RequestBody LocalRegisterDTO localRegisterDTO){
        localAuthService.localRegister(localRegisterDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body("유저 생성 완료");
    }

    @GetMapping("/register/check/nickname")
    public ResponseEntity<Boolean> duplicateNickname(@RequestParam String nickname){
        return ResponseEntity.ok(localAuthService.duplicateNickname(nickname));
    }


}
