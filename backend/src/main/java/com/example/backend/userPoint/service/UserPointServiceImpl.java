package com.example.backend.userPoint.service;

import com.example.backend.entity.user.User;
import com.example.backend.entity.user.UserPoint;
import com.example.backend.exception.RewardException;
import com.example.backend.userPoint.dto.response.PaymentResponseDTO;
import com.example.backend.userPoint.repository.UserPointRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

@Service
public class UserPointServiceImpl implements UserPointService{
    private final UserPointRepository userPointRepository;

    public UserPointServiceImpl(UserPointRepository userPointRepository) {
        this.userPointRepository = userPointRepository;
    }

    @Override
    @PreAuthorize("isAuthenticated() and @userRewardService.isOwnerOfUserPoint(#userPointId, principal.id)")
    public PaymentResponseDTO payResult(Long userPointId) {
        PaymentResponseDTO dto = userPointRepository.payResponse(userPointId);
        if (dto == null) {
            throw new RewardException("해당 userPointId에 대한 결제 정보를 찾을 수 없습니다.");
        }
        return dto;
    }

    private boolean isOwnerOfPointById(Long userPointId,Long userId){
        return userPointRepository.findById(userPointId)
                .map(userPoint -> userPoint.getUserId().equals(userId))
                .orElse(false);
    }
}
