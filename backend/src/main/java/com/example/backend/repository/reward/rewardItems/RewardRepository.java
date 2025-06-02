package com.example.backend.repository.reward.rewardItems;

import com.example.backend.entity.reward.RewardItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardRepository extends JpaRepository<RewardItems,Long>, RewardRepositoryCustom {


//    @Query("SELECT new com.example.backend.dto.reward.FindRewardDetailDTO(" +
//            " r.id, r.name, r.description," +
//            " r.pointCost , r.createdAt, ri.rewardItemsImgUrl ) " +
//            " FROM RewardItems r " +
//            " JOIN RewardItemImages ri " +
//            " ON r.id = ri.id " +
//            " WHERE r.id = : id")
//    FindRewardDetailDTO findRewardDetailById(@Param("id") long id);
}
