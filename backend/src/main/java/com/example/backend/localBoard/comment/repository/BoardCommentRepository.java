package com.example.backend.localBoard.comment.repository;

import com.example.backend.entity.localBoard.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface BoardCommentRepository extends JpaRepository<Comments, Long>, BoardCommentRepositoryCustom {
    @Query(" SELECT count(c) FROM Comments c" +
            " WHERE c.userId =:userId" +
            " AND c.createdAt BETWEEN :startAt AND :endAt")
    Long countCommentMission(@Param("userId") Long userId, @Param("startAt") Timestamp startAt, @Param("endAt") Timestamp endAt);
}
