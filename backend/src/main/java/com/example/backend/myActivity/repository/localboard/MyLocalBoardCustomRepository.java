package com.example.backend.myActivity.repository.localboard;

import com.example.backend.myActivity.dto.MyLocalBoardCommentResponse;
import com.example.backend.myActivity.dto.MyLocalBoardPostResponse;

import java.util.List;

public interface MyLocalBoardCustomRepository {
    List<MyLocalBoardPostResponse> findLocalBoardPostList(Long userId, Long cursor, int limitOnePlus, int filterRange);

    List<MyLocalBoardCommentResponse> findLocalBoardCommentList(Long userId, Long cursor, int limitPlusOne, int filterRange);
}
