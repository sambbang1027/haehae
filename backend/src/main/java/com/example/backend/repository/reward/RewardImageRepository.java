package com.example.backend.repository.reward;

import com.example.backend.entity.reward.RewardItemImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardImageRepository extends JpaRepository<RewardItemImages,Long> {
}
