package com.example.backend.repository.reward.rewardItems;

import com.example.backend.entity.reward.RewardItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardRepository extends JpaRepository<RewardItems,Long>, RewardRepositoryCustom {

}
