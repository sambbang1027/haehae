package com.example.backend.reward.rewardItems.repository;

import com.example.backend.entity.reward.RewardItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardRepository extends JpaRepository<RewardItems,Long>, RewardRepositoryCustom {
    long countByRewardTypeAndStockGreaterThan(RewardItems.RewardType rewardType, int stock);

}
