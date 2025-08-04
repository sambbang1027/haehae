package com.example.backend.userPenalty.repository;

import com.example.backend.entity.report.UserPenalty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface UserPenaltyRepository extends JpaRepository<UserPenalty,Long> , UserPenaltyCustom{

}
