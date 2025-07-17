package com.example.backend.userPenalty.repository;

import com.example.backend.entity.report.UserPenalty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPenaltyRepository extends JpaRepository<UserPenalty,Long> {
    
}
