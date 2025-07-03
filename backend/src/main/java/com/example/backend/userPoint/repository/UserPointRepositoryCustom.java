package com.example.backend.userPoint.repository;

import com.example.backend.userPoint.dto.response.PaymentResponseDTO;
import org.springframework.data.repository.query.Param;

public interface UserPointRepositoryCustom {
    PaymentResponseDTO payResponse(@Param("userPointId") long userPointId);
}
