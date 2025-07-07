package com.example.backend.userPoint.service;

import com.example.backend.userPoint.dto.response.PaymentResponseDTO;

public interface UserPointService {
     PaymentResponseDTO payResult(Long userPointId);
}
