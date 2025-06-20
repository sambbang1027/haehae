package com.example.backend.sharing.service;

import com.example.backend.sharing.dto.response.SharingCotentResponseDTO;
import com.example.backend.sharing.dto.response.SharingDetailResponseDTO;
import com.example.backend.sharing.dto.response.SharingImageResponseDTO;

import java.util.List;

public interface SharingQueryService{
    //sharingPostId로 나눔 게시물(작성자 정보, 게시글 제목/내용/날짜/사진) 조회하기
    public SharingDetailResponseDTO getSharingDetail(Long sharingPostId);
}
