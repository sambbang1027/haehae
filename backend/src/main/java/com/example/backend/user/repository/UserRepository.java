package com.example.backend.user.repository;

import com.example.backend.entity.user.User;
import com.example.backend.user.vo.Email;
import com.example.backend.user.vo.Nickname;
import jakarta.transaction.Transactional;
import com.example.backend.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 중복검사
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
    @Query("SELECT u.currentPoint FROM User u WHERE u.id= :userId")
    long findCurrentPointByUserId(@Param("userId") long userId);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.currentPoint = :currentPoint WHERE u.id = :id")
    void updateCurrentPoint(@Param("currentPoint")long currentPoint, @Param("id") long id);


    Optional<User> findByEmail(String email);

}
