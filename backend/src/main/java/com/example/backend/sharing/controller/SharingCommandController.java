package com.example.backend.sharing.controller;

import com.example.backend.sharing.dto.request.CreateSharingRequestDTO;
import com.example.backend.sharing.dto.request.SharingImageRequestDTO;
import com.example.backend.sharing.dto.request.SharingStatusRequestDTO;
import com.example.backend.sharing.dto.request.UpdateSharingRequestDTO;
import com.example.backend.sharing.service.SharingCommandService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("sharing")
public class SharingCommandController {

    @Autowired
    SharingCommandService sharingCommandService;

    //나눔 게시물 작성
    @PostMapping("/create")
    public ResponseEntity<Void> createSharingRequest(@Valid @RequestBody CreateSharingRequestDTO createSharingRequestDTO) {

        sharingCommandService.createSharingDetail(createSharingRequestDTO);

        return ResponseEntity.ok().build();
    }

    //나눔 게시물 상태 변경
    @PutMapping("/update/status")
    public ResponseEntity<Void> updateSharingStatusRequest(@RequestBody SharingStatusRequestDTO sharingStatusRequestDTO) {

//        Long userId = userDetails.getUserId(); // 이건 @Valid 대상 아님!!!
//
//        if (userId == null) {
//            throw new HaehaeException(USER_NOT_FOUND); // ✅ 이런 식으로 예외 처리!!!
//        }
        Long userId = 6L;

        sharingStatusRequestDTO.setUserId(userId);

        sharingCommandService.updateSharingStatus(sharingStatusRequestDTO);

        return ResponseEntity.noContent().build();
    }

    //나눔 게시물 상세 (제목, 본문) 수정
    @PutMapping("/update/detail")
    public ResponseEntity<Void> updateSharingDetail(@RequestBody UpdateSharingRequestDTO updateSharingRequestDTO) {
//        Long userId = userDetails.getUserId(); // 이건 @Valid 대상 아님!!!
//
//        if (userId == null) {
//            throw new HaehaeException(USER_NOT_FOUND); // ✅ 이런 식으로 예외 처리!!!
//        }

        Long userId = 6L;

        updateSharingRequestDTO.setUserId(userId);

        sharingCommandService.updateSharingDetail(updateSharingRequestDTO);

        return ResponseEntity.noContent().build();
    }

    //나눔 이미지 추가
    @PostMapping("/add/image")
    public ResponseEntity<Void> addSharingImage(@RequestBody SharingImageRequestDTO sharingImageRequestDTO) {

        sharingCommandService.addSharingImages(sharingImageRequestDTO);

        return ResponseEntity.noContent().build();
    };

    //나눔 이미지 삭제
    @DeleteMapping
    public ResponseEntity<Void> deleteSharingImage(@RequestBody SharingImageRequestDTO sharingImageRequestDTO) {
        sharingCommandService.deleteSharingImages(sharingImageRequestDTO);

        return ResponseEntity.noContent().build();
    }

}
