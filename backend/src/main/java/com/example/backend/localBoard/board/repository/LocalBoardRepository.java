package com.example.backend.localBoard.board.repository;

import com.example.backend.entity.localBoard.LocalBoards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;


public interface LocalBoardRepository extends JpaRepository<LocalBoards, Long>, LocalBoardRepositoryCustom {

    // 미션상태에서 지역 게시판 로그 조회(숫자로)
    @Query(" SELECT count(l) FROM LocalBoards l " +
            " WHERE l.userId =:userId " +
            " AND l.createdAt BETWEEN :startAt AND :endAt")
    Long countLocalBoardCheckMission(@Param("userId") Long userId, @Param("startAt") Timestamp startAt,@Param("endAt") Timestamp endAt);

    @Query( "SELECT l.userId FROM LocalBoards l" +
            " WHERE l.localBoardId = :localBoardId")
    Long findLocalBoardUserId(@Param("localBoardId")Long localBoardId);
}
