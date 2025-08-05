package com.example.backend.reward.userReward.service;

import com.example.backend.entity.reward.RewardItems;
import com.example.backend.entity.reward.UserRewards;
import com.example.backend.entity.user.UserPoint;
import com.example.backend.exception.RewardException;
import com.example.backend.reward.rewardItems.repository.RewardRepository;
import com.example.backend.reward.userReward.dto.request.UserRewardPointRequestInsertDTO;
import com.example.backend.reward.userReward.repository.UserRewardRepository;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.userPoint.repository.UserPointRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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


    // 리워드 결제 등록
    // 1. 권한 체크
    // 2. 포인트 예외처리
    // 3. 유저 포인트 등록
    // 4. 유저 리워드 등록
    // 5. 재고 예외처리
    // 6. 유저 현재 포인트 업데이트
    @Transactional(timeout = 5)
    @Override
    @PreAuthorize("isAuthenticated()")
    public Long userRewardPointInsert(UserRewardPointRequestInsertDTO dto) {
        long amount = dto.getAmount();
        long id = dto.getUserId();

        // 1. 특정 유저의 현재 포인트 조회 쿼리(Lock 적용)
        long currentPoint = userRepository.findCurrentPointByUserId(id);

        if (currentPoint == 0) {
            throw new RewardException("보유하신 포인트가 없습니다.");
        } else if (currentPoint < amount) {
            throw new RewardException("보유하신 포인트가 적습니다. 보유 : " + currentPoint + "p , 차감 : " + amount + "p");
        }
        // 2. 유저 포인트 테이블 등록 (로그)
        UserPoint point = userPointRepository.save(dto.toEntityUserPoint());
        long userPointId = point.getId();

        // 3. 유저 리워드 테이블 등록(로그,  결제 정보)
        userRewardRepository.save(dto.toEntityUserReward(userPointId));

        // 4. 리워드 상품의 재고 조회 쿼리(Lock 적용)
        RewardItems rewardItems = rewardRepository.findByRewardItemInfo(dto.getRewardItemId())
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
        Long currentPoint = userRepository.findCurrentPointUserId(userId);
        if(currentPoint == null){
            currentPoint = 0l;
        }
        return currentPoint;
    }

    // 환불 로직
    // 권한 체크와 , 해당 유저가 결제한 정보가 맞는지 확인.
    // 유저 포인트 환불 업데이트
    // 유저 리워드 환불 업데이트
    // 재고 업데이트
    // 유저의 현재 포인트와 총 포인트 업데이트
    @Override
    @Transactional(timeout = 5)
    @PreAuthorize("hasRole('ADMIN') or (isAuthenticated() and @userRewardService.isOwnerOfUserPoint(#userPointId, principal.id))")
    public void userRewardPayRefund(Long userPointId) {
        // LOCK 적용.
        UserPoint point =  userPointRepository.findByUserPoint(userPointId)
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


        // Lock 적용.
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

        // Lock 적용.
        RewardItems rewardItem = rewardRepository.findByRewardItemInfo(refundReward.getRewardItemId())
                .orElseThrow(() -> new RewardException("해당 상품이 존재 하지 않습니다."));

        if (rewardItem.getRewardType() != RewardItems.RewardType.DONATION) {
             rewardItem.increaseStock(userRewards.getCount());
            rewardRepository.save(rewardItem);
        }

        // Lock 적용.
        long currentPoint = userRepository.findCurrentPointByUserId(point.getUserId());
        long resultPoint =  currentPoint + point.getAmount();
        userRepository.updateCurrentPoint(resultPoint, point.getUserId());

    }

    // 해당 유저가 결제한 정보가 맞는지 체크하는 로직.
    private Boolean isOwnerOfUserPoint(Long userPointId, Long userId){
        return userPointRepository.findById(userPointId)
                .map(userPoint -> userPoint.getUserId().equals(userId))
                .orElse(false);
    }
}
