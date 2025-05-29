package com.example.backend.repository.reward;

import com.example.backend.dto.reward.FindRewardListDTO;
import com.example.backend.entity.reward.RewardItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RewardRepository extends JpaRepository<RewardItems,Long> {
    @Query(" SELECT  r.rewardItemId, r.name, " +
            " r.pointCost, i.rewardItemsImgUrl " +
            " FROM RewardItems r " +
            " LEFT JOIN RewardItemImages i " +
            " ON i.rewardItem.rewardItemId = r.rewardItemId" +
            " WHERE r.rewardType = :rewardType" +
            " AND r.stock > 0")
    public List<Object[]> findRewardItemDetailsByType(@Param("rewardType")RewardItems.RewardType rewardType);
}
