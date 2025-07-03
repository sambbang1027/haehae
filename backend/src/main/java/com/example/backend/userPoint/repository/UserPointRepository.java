package com.example.backend.userPoint.repository;

import com.example.backend.entity.user.UserPoint;
import com.example.backend.userPoint.dto.response.PaymentResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPointRepository extends JpaRepository<UserPoint , Long>, UserPointRepositoryCustom {

}
