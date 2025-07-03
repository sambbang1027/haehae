package com.example.backend.userPoint.controller;

import com.example.backend.userPoint.dto.response.PaymentResponseDTO;
import com.example.backend.userPoint.service.UserPointService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/pay")
public class UserPointController {
    private final UserPointService userPointService;

    public UserPointController(UserPointService userPointService) {
        this.userPointService = userPointService;
    }

    @GetMapping("/result/{userPointId}")
    public ResponseEntity<PaymentResponseDTO> paymentResult(@PathVariable long userPointId){
        PaymentResponseDTO dto = userPointService.payResult(userPointId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

}
