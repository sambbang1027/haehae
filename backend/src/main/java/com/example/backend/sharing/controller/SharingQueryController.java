package com.example.backend.sharing.controller;


import com.example.backend.security.CustomUserDetails;
import com.example.backend.sharing.dto.response.SharingDetailResponseDTO;
import com.example.backend.sharing.dto.response.SharingListReponseDTO;
import com.example.backend.sharing.service.SharingListQueryService;
import com.example.backend.sharing.service.SharingQueryService;
import com.example.backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sharing")
public class SharingQueryController {

    @Autowired
    SharingListQueryService sharingListQueryService;

    @Autowired
    SharingQueryService sharingQueryService;

    @Autowired
    UserRepository userRepository;

    //나눔 게시물 리스트 조회하기
    @GetMapping("/list/query")
    public ResponseEntity<List<SharingListReponseDTO>> getSharingListResponse(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(value = "keyword", required = false) String keyword) {

        System.out.println(keyword);
        //1.Token에 기입된 로그인 유저의 email(ID) 가져오기
        String username = userDetails.getUsername();

        //2. email(ID)로 해당 유저의 지역코드(region_code/b_code) 조회
        String regionCode = userRepository.getRegionCodeById(username);

        //3. 조회된 지역코드(region_code/b_code)와 keyword로 지역 내의 나눔 게시물들 조회
        List<SharingListReponseDTO> sharingList = sharingListQueryService.getSharingList(regionCode, keyword);

        //4. 해당 지역의 나눔 게시물들 반환
        return ResponseEntity.ok(sharingList);
    }

    //sharingPostId로 나눔 게시물(작성자 정보, 게시글 제목/내용/사진) 조회하기
    @GetMapping("/detail/query/{sharingPostId}")
    public ResponseEntity<SharingDetailResponseDTO> getSharingDetailResponse(@PathVariable Long sharingPostId) {

        SharingDetailResponseDTO sharingDetail = sharingQueryService.getSharingDetail(sharingPostId);

        return ResponseEntity.ok(sharingDetail);
    }

}
