package com.example.backend.auth.controller;

import com.example.backend.auth.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("api/email")
@RestController
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/send/code")
    public ResponseEntity<String> sendMailVerification(@RequestParam  String email){
       String response =  emailService.sendMail(email);
        return ResponseEntity.ok(response);
    }



}
