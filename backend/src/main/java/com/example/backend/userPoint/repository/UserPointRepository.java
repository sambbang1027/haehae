package com.example.backend.userPoint.repository;

import com.example.backend.entity.user.UserPoint;
import com.example.backend.userPoint.dto.response.PaymentResponseDTO;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserPointRepository extends JpaRepository<UserPoint , Long>, UserPointRepositoryCustom {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT up FROM UserPoint up " +
            " WHERE id = :id")
    public Optional<UserPoint> findByUserPoint(long id);
}
