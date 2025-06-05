package com.example.backend.reward.userReward.repository;

import com.example.backend.entity.reward.UserRewards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRewardRepository extends JpaRepository<UserRewards,Long>, UserRewardRepositoryCustom {
}
