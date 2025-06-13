package com.example.backend.userPoint.repository;

import com.example.backend.entity.user.UserPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPointRepository extends JpaRepository<UserPoint , Long> {
}
