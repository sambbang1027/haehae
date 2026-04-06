package com.example.backend.myActivity.repository.sharing;

import com.example.backend.myActivity.dto.MySharingActivityResponse;

import java.util.List;

public interface MySharingCustomRepository{

    List<MySharingActivityResponse> findSharingPosts(Long userId, Long cursor, int limitPlusOne, int filterRange);
}
