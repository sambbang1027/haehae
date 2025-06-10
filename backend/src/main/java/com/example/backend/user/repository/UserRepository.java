package com.example.backend.user.repository;

import com.example.backend.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u.currentPoint FROM User u WHERE u.id= :userId")
    long findCurrentPointByUserId(@Param("userId") long userId);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.currentPoint = :currentPoint WHERE u.id = :id")
    void updateCurrentPoint(@Param("currentPoint")long currentPoint, @Param("id") long id);


}
