package com.example.backend.auth.controller;

import com.example.backend.auth.dto.VerifyRequestDTO;
import com.example.backend.auth.service.EmailService;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("api/email")
@RestController
public class EmailController {

    private final EmailService emailService;


    @PostMapping("/send/code")
    public ResponseEntity<String> sendMailVerification(@RequestParam  String email){
        emailService.sendMail(email);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/check/verification")
    public ResponseEntity<String> compareVerification(@RequestBody VerifyRequestDTO verifyRequestDTO){
        Boolean result = emailService.checkVerificationCode(verifyRequestDTO.getEmail(), verifyRequestDTO.getCode());

        if(result){
            emailService.deleteVerificationCode(verifyRequestDTO.getEmail());
            return ResponseEntity.ok("이메일 인증 성공!!");
        }else {
            throw new HaehaeException(ErrorCode.INVALID_VERIFICATION_CODE);
        }
    }


}
