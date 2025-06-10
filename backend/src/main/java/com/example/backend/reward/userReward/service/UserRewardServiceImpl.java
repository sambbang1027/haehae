package com.example.backend.reward.userReward.service;

import com.example.backend.entity.UserPoint;
import com.example.backend.exception.InsufficientPointException;
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
         long id = dto.getUserId();

         userRewardRepository.save(dto.toEntityUserReward(userPointId));
         long currentPoint = userRepository.findCurrentPointByUserId(id);
         if(currentPoint == 0){
             throw new IllegalStateException("보유하신 포인트가 없습니다.");
         }else if(currentPoint < amount){
           throw new InsufficientPointException("보유하신 포인트가 적습니다. 보유 : "+currentPoint+"p , 차감 : "+amount+"p");
          }
         long resultPoint = currentPoint - amount;
         userRepository.updateCurrentPoint(resultPoint,id);

    }
}
