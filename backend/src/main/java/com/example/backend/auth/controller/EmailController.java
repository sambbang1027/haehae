package com.example.backend.auth.controller;

import com.example.backend.auth.dto.EmailDTO;
import com.example.backend.auth.dto.VerifyRequestDTO;
import com.example.backend.auth.service.EmailService;
import com.example.backend.common.response.HaehaeResponse;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.user.service.LocalUserServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("api/email")
@RestController
public class EmailController {

    private final EmailService emailService;
    private final LocalUserServiceImpl localUserService;


        // 이메일에 코드 전송
    @PostMapping("/send/code")
    public ResponseEntity<HaehaeResponse<Void>> sendMailVerification(@Valid @RequestBody EmailDTO emailDTO){

        emailService.handleSendMail(emailDTO);
        return ResponseEntity.ok(HaehaeResponse.ok());
    }

    // 인증 코드 검증
    @PostMapping("/verify/code")
    public ResponseEntity<HaehaeResponse<Void>> compareVerification(@RequestBody VerifyRequestDTO verifyRequestDTO){
        Boolean result = emailService.checkVerificationCode(verifyRequestDTO.getVerificationType()
                                                            ,verifyRequestDTO.getEmail(), verifyRequestDTO.getCode());
            return ResponseEntity.ok(HaehaeResponse.ok());
    }

    @PostMapping("/verify/pw-reset/code")
    public ResponseEntity<HaehaeResponse<String>> verifyPwResetCode(@RequestBody VerifyRequestDTO verifyRequestDTO){
        String result = emailService.verifyPwCodeAndIssueToken(verifyRequestDTO.getEmail(),
                                                            verifyRequestDTO.getCode());
        return ResponseEntity.ok(HaehaeResponse.ok(result));
    }

}
