package com.example.backend.myActivity.repository.localboard;

import com.example.backend.entity.localBoard.LocalBoards;
import com.example.backend.myActivity.dto.MyLocalBoardPostResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MyLocalBoardRepository extends JpaRepository<LocalBoards, Long>, MyLocalBoardCustomRepository {

    List<MyLocalBoardPostResponse> findLocalBoardPostList(Long userId, Long cursor, int limitPlusOne, int filterRange);
}
