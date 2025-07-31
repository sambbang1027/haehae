package com.example.backend.userPoint.repository;

import com.example.backend.userPoint.dto.response.PaymentResponseDTO;
import com.example.backend.userPoint.dto.response.UserPointRecordResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface UserPointRepositoryCustom {
    PaymentResponseDTO payResponse(@Param("userPointId") long userPointId);
    Map<Long, Long> getUserPointFor6month(List<Long> userId);
    Slice<UserPointRecordResponse> getUserPointRecord(Long userId, int filterRange, Pageable pageable);
}
