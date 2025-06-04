package com.example.backend.user.repository;

import com.example.backend.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 중복검사
    boolean existsByEmail(String email);
    boolean existsByNickname(String nickname);
}
