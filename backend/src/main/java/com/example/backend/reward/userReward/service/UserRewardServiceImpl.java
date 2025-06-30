package com.example.backend.reward.userReward.service;

import com.example.backend.entity.reward.RewardItems;
import com.example.backend.entity.user.UserPoint;
import com.example.backend.exception.InsufficientPointException;

import com.example.backend.reward.rewardItems.repository.RewardRepository;
import com.example.backend.reward.userReward.dto.request.UserRewardPointRequestInsertDTO;
import com.example.backend.reward.userReward.repository.UserRewardRepository;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.userPoint.repository.UserPointRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
    public void UserRewardPointInsert(UserRewardPointRequestInsertDTO dto) {
        long amount = dto.getAmount();
        long id = dto.getUserId();

        long currentPoint = userRepository.findCurrentPointByUserId(id);
        if (currentPoint == 0) {
            throw new IllegalStateException("보유하신 포인트가 없습니다.");
        } else if (currentPoint < amount) {
            throw new InsufficientPointException("보유하신 포인트가 적습니다. 보유 : " + currentPoint + "p , 차감 : " + amount + "p");
        }

        UserPoint point = userPointRepository.save(dto.toEntityUserPoint());
        long userPointId = point.getId();
        userRewardRepository.save(dto.toEntityUserReward(userPointId));


        RewardItems rewardItems = rewardRepository.findById(dto.getRewardItemId())
                .orElseThrow(() -> new EntityNotFoundException("Reward item not found"));

        if (rewardItems.getRewardType() != RewardItems.RewardType.DONATION) {
            rewardItems.decreaseStock(1);
            rewardRepository.save(rewardItems);
        }

        long resultPoint = currentPoint - amount;
        userRepository.updateCurrentPoint(resultPoint, id);
    }

    @Override
    public Long userFindPoint(Long userId) {
        Long currentPoint = userRepository.findCurrentPointByUserId(userId);
        if(currentPoint == null){
            currentPoint = 0l;
        }
        return currentPoint;
    }
}
