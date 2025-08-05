package com.example.backend.reward.userReward.repository;

import com.example.backend.entity.reward.UserRewards;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.Optional;

@Repository
public interface UserRewardRepository extends JpaRepository<UserRewards,Long>, UserRewardRepositoryCustom {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT r FROM UserRewards r WHERE r.userPointId = :userPointId")
    Optional<UserRewards> findByPointId(@Param("userPointId") Long userPointId);

//    int countByUserIdAndCreatedAtBetween(Long userId, Timestamp start, Timestamp end);

}
