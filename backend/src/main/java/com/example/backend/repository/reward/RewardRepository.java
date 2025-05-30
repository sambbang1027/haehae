package com.example.backend.repository.reward;

import com.example.backend.dto.reward.FindRewardDetailDTO;
import com.example.backend.dto.reward.FindRewardListDTO;
import com.example.backend.entity.reward.RewardItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

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
