package com.example.backend.reward.userReward.service;

import com.example.backend.entity.reward.RewardItems;
import com.example.backend.entity.reward.UserRewards;
import com.example.backend.entity.user.UserPoint;
import com.example.backend.exception.InsufficientPointException;

import com.example.backend.exception.RewardException;
import com.example.backend.reward.rewardItems.repository.RewardRepository;
import com.example.backend.reward.userReward.dto.request.UserRewardPointRequestInsertDTO;
import com.example.backend.reward.userReward.repository.UserRewardRepository;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.userPoint.repository.UserPointRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class UserRewardServiceImpl implements UserRewardService {

    private final UserRewardRepository userRewardRepository;
    private final UserRepository userRepository;
    private final UserPointRepository userPointRepository;
    private final RewardRepository rewardRepository;

    public UserRewardServiceImpl(UserRewardRepository userRewardRepository, UserRepository userRepository, UserPointRepository userPointRepository, RewardRepository rewardRepository) {
        this.userRewardRepository = userRewardRepository;
        this.userRepository = userRepository;
        this.userPointRepository = userPointRepository;
        this.rewardRepository = rewardRepository;
    }

    @Transactional
    @Override
    public Long userRewardPointInsert(UserRewardPointRequestInsertDTO dto) {
        long amount = dto.getAmount();
        long id = dto.getUserId();

        System.out.println(dto);

        long currentPoint = userRepository.findCurrentPointByUserId(id);
        if (currentPoint == 0) {
            throw new RewardException("보유하신 포인트가 없습니다.");
        } else if (currentPoint < amount) {
            throw new RewardException("보유하신 포인트가 적습니다. 보유 : " + currentPoint + "p , 차감 : " + amount + "p");
        }

        UserPoint point = userPointRepository.save(dto.toEntityUserPoint());
        long userPointId = point.getId();
        userRewardRepository.save(dto.toEntityUserReward(userPointId));


        RewardItems rewardItems = rewardRepository.findById(dto.getRewardItemId())
                .orElseThrow(() -> new RewardException("해당 상품이 존재 하지 않습니다."));

        if (rewardItems.getRewardType() != RewardItems.RewardType.DONATION) {
            if (rewardItems.getStock() <= 0) {
                throw new RewardException("해당 상품의 재고가 현재 없습니다.");
            } else if(rewardItems.getStock() < dto.getCount()) {
                throw new RewardException("현재 상품의 재고가 부족합니다. (현재 재고량 : "+rewardItems.getStock()+")");
            }
            rewardItems.decreaseStock(dto.getCount());
            rewardRepository.save(rewardItems);
        }

        long resultPoint = currentPoint - amount;
        userRepository.updateCurrentPoint(resultPoint, id);

        return userPointId;
    }

    @Override
    public Long userFindPoint(Long userId) {
        Long currentPoint = userRepository.findCurrentPointByUserId(userId);
        if(currentPoint == null){
            currentPoint = 0l;
        }
        return currentPoint;
    }

    @Override
    @Transactional
    public void userRewardPayRefund(Long userPointId) {
        UserPoint point =  userPointRepository.findById(userPointId)
        .orElseThrow(() -> new RewardException("결제 정보가 존재하지 않습니다."));

        if(point.getPointType().equals("환불")){
            throw new RewardException("이미 환불처리된 결제 정보입니다.");
        }

        UserPoint refundPoint = point.toBuilder()
                .id(null)
                .userId(point.getUserId())
                .pointType("환불")
                .amount(point.getAmount())
                .source(point.getSource())
                .refundedFromId(point.getId())
                .build();
        userPointRepository.save(refundPoint);

        UserRewards userRewards =  userRewardRepository.findByPointId(userPointId)
                .orElseThrow(() -> new RewardException("결제 정보가 존재하지 않습니다."));

        if(userRewards.getStatus() == UserRewards.Status.REFUND){
            throw new RewardException("이미 환불처리된 결제 정보입니다.");
        }

        UserRewards refundReward = userRewards.toBuilder()
                .id(userRewards.getId())
                .rewardItemId(userRewards.getRewardItemId())
                .status(UserRewards.Status.REFUND)
                .userPointId(userRewards.getUserPointId())
                .build();
        userRewardRepository.save(refundReward);

        RewardItems rewardItem = rewardRepository.findById(refundReward.getRewardItemId())
                .orElseThrow(() -> new RewardException("해당 상품이 존재 하지 않습니다."));

        if (rewardItem.getRewardType() != RewardItems.RewardType.DONATION) {
             rewardItem.increaseStock(userRewards.getCount());
            rewardRepository.save(rewardItem);
        }

        long currentPoint = userRepository.findCurrentPointByUserId(point.getUserId());
        long resultPoint =  currentPoint + point.getAmount();
        userRepository.updateCurrentPoint(resultPoint, point.getUserId());

    }
}
