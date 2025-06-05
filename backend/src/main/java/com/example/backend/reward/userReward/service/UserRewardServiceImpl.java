package com.example.backend.reward.userReward.service;

import com.example.backend.entity.UserPoint;
import com.example.backend.reward.userReward.dto.request.UserRewardPointRequestInsertDTO;
import com.example.backend.reward.userReward.repository.UserRewardRepository;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.userPoint.repository.UserPointRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class UserRewardServiceImpl implements UserRewardService {

    private final UserRewardRepository userRewardRepository;
    private final UserRepository userRepository;
    private final UserPointRepository userPointRepository;

    public UserRewardServiceImpl(UserRewardRepository userRewardRepository, UserRepository userRepository, UserPointRepository userPointRepository) {
        this.userRewardRepository = userRewardRepository;
        this.userRepository = userRepository;
        this.userPointRepository = userPointRepository;
    }

    @Transactional
    @Override
    public void UserRewardPointInsert(UserRewardPointRequestInsertDTO dto) {
         UserPoint point = userPointRepository.save(dto.toEntityUserPoint());
         long userPointId = point.getId();
         long amount = dto.getAmount();

         userRewardRepository.save(dto.toEntityUserReward(userPointId));
         long currentPoint = userRepository.findCurrentPointByUserId(dto.getUserId());

         if(currentPoint <amount){
             System.out.println("보유 포인트 적음");
             // throw new
          }
         long resultPoint = currentPoint - amount;
         System.out.println(resultPoint);
    }
}
