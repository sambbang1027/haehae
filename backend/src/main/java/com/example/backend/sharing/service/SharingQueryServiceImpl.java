package com.example.backend.sharing.service;

import com.example.backend.sharing.dto.response.SharingDetailResponseDTO;
import com.example.backend.sharing.repository.images.SharingImageRepository;
import com.example.backend.sharing.repository.sharingPosts.SharingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class SharingQueryServiceImpl implements SharingQueryService {

    @Autowired
    private SharingRepository sharingRepository;

    @Autowired
    private SharingImageRepository sharingImageRepository;

    //sharingPostId로 나눔 게시물(작성자 정보, 게시글 제목/내용/날짜/사진) 조회하기
    public SharingDetailResponseDTO getSharingDetail(Long sharingPostId){

        //1. SharingDetailResponseDTO(SharingContentResponseDTO, List<SharingImageResponseDTO>) 객체 생성
        SharingDetailResponseDTO sharingDetail = new SharingDetailResponseDTO();

        //2. sharingPostId로 작성자 정보, 게시글 제목/내용/날짜 조회
        sharingDetail.setContent(sharingRepository.getSharingDetail(sharingPostId));
        
        //3. sharingPostId로 게시글 이미지들 조회
        sharingDetail.setImages(sharingImageRepository.getSharingImagesById(sharingPostId));

        //4. 유저 정보, 게시글 상세 담겨있는 SharingDetailResponseDTO 반환
        return sharingDetail;
    }

}
