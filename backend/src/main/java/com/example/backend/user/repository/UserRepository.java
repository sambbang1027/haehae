package com.example.backend.user.repository;

import com.example.backend.entity.user.User;
import com.example.backend.user.dto.UserCurrentAndTotalPointResponseDTO;
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
public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

    // 중복검사
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);

    // 유저의 현재 포인트
    @Query("SELECT u.currentPoint FROM User u WHERE u.id= :userId")
    long findCurrentPointByUserId(@Param("userId") long userId);


    //유저의 현재 , 총 포인트, 유저 등급
    @Query("SELECT new com.example.backend.user.dto.UserCurrentAndTotalPointResponseDTO " +
            " (u.currentPoint, u.totalPoint, u.userLevelId) " +
            " FROM User u WHERE u.id= :userId ")
    UserCurrentAndTotalPointResponseDTO findCurrentAndTotalPointByUserId(@Param("userId") long userId);

    
    // 현재 포인트 업데이트
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.currentPoint = :currentPoint WHERE u.id = :id")
    void updateCurrentPoint(@Param("currentPoint")long currentPoint, @Param("id") long id);
    
    // 총 포인트 업데이트
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.totalPoint = :totalPoint WHERE u.id = :id")
    void updateTotalPoint(@Param("totalPoint")long totalPoint, @Param("id") long id);

    // 유저 등급 업데이트
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.userLevelId = :nextLevelId WHERE u.id =:id")
    void updateUserLevelId(@Param("nextLevelId")long nextLevelId, @Param("id") long id);

    @Query("SELECT u.id FROM User u WHERE u.email= :username")
    long findIdByUsername(@Param("username") String username);


    Optional<User> findByEmail(String email);

    @Query("SELECT u.email FROM User u WHERE u.name = :username AND u.phoneNumber = :phoneNumber")
    String findEmailByUsernameAndPhoneNumber(@Param("username") String username, @Param("phoneNumber") String phoneNumber);




}
