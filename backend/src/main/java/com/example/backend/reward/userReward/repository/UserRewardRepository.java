package com.example.backend.reward.userReward.repository;

import com.example.backend.entity.reward.UserRewards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRewardRepository extends JpaRepository<UserRewards,Long>, UserRewardRepositoryCustom {
    @Query("SELECT r FROM UserRewards r WHERE r.userPointId = :userPointId")
    Optional<UserRewards> findByPointId(@Param("userPointId") Long userPointId);
}
