package com.example.backend.user.controller;

import com.example.backend.common.response.HaehaeResponse;
import com.example.backend.user.dto.FindIdRequest;
import com.example.backend.user.dto.FindPwRequest;
import com.example.backend.user.dto.LocalRegisterDTO;
import com.example.backend.user.service.LocalUserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final LocalUserServiceImpl localAuthService;

    // 로컬 회원가입
    @PostMapping("/register/local")
    public ResponseEntity<HaehaeResponse<Void>>localRegister(@RequestBody LocalRegisterDTO localRegisterDTO){
        localAuthService.localRegister(localRegisterDTO);

        return ResponseEntity.ok(HaehaeResponse.ok());
    }

    // 닉넴 중복 확인
    @GetMapping("/register/check/nickname")
    public ResponseEntity<HaehaeResponse<Boolean>> duplicateNickname(@RequestParam String nickname){
        return ResponseEntity.ok(HaehaeResponse.ok(localAuthService.duplicateNickname(nickname)));
    }


    // 아이디 찾기
    @PostMapping("/find/id")
    public ResponseEntity<HaehaeResponse<String>> findUserId(@RequestBody FindIdRequest findIdRequest){
        return ResponseEntity.ok(HaehaeResponse.ok(localAuthService.findEmailByNmaeAndPhoneNum(findIdRequest)));
    }

    // 비밀번호 재설정
    @PostMapping("/reset/pw")
    public ResponseEntity<HaehaeResponse<Void>> resetPwd(@RequestBody FindPwRequest findPwRequest){
       localAuthService.resetPassword(findPwRequest.getToken(), findPwRequest.getNewPwd());
        return ResponseEntity.ok(HaehaeResponse.ok());
    }
}
