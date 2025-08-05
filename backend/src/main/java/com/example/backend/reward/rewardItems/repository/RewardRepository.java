package com.example.backend.reward.rewardItems.repository;

import com.example.backend.entity.reward.RewardItems;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RewardRepository extends JpaRepository<RewardItems,Long>, RewardRepositoryCustom {
    long countByRewardTypeAndStockGreaterThan(RewardItems.RewardType rewardType, int stock);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT r FROM RewardItems r " +
            " WHERE r.id = :id")
    public Optional<RewardItems> findByRewardItemInfo(@Param("id") Long id);
}
