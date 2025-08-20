package com.example.backend.myActivity.controller;


import com.example.backend.common.response.HaehaeResponse;
import com.example.backend.myActivity.dto.MyLocalBoardCommentResponse;
import com.example.backend.myActivity.dto.MyLocalBoardPostResponse;
import com.example.backend.myActivity.dto.MyMissionHistoryResponse;
import com.example.backend.myActivity.dto.MySharingActivityResponse;
import com.example.backend.myActivity.service.LocalBoardHistoryService;
import com.example.backend.myActivity.service.MissionHistoryService;
import com.example.backend.myActivity.service.SharingPostHistoryService;
import com.example.backend.pagination.response.CursorPageResponse;
import com.example.backend.security.CustomUserDetails;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RequestMapping("/api/myActivity")
@RestController
public class MyActivityController {

    private final MissionHistoryService missionHistoryService;
    private final LocalBoardHistoryService localBoardHistoryService;
    private final SharingPostHistoryService sharingPostHistoryService;

    // 참여한 미션 내역 확인
    @GetMapping("/missionHistory/{filterRange}")
    public ResponseEntity<CursorPageResponse<MyMissionHistoryResponse>> missionHistory
            (@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable int filterRange,
             @RequestParam(required = false) Long cursor, @RequestParam int limit){
        CursorPageResponse<MyMissionHistoryResponse> responses =
                missionHistoryService.missionHistoryList(userDetails.getId(),cursor,limit, filterRange);

        return ResponseEntity.ok(responses);
    }

    // 작성한 게시글 목록 불러오기
    @GetMapping("/localBoard/post/{filterRange}")
    public ResponseEntity<CursorPageResponse<MyLocalBoardPostResponse>> localBoardPostHistory
            (@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable int filterRange,
             @RequestParam(required = false) Long cursor, @RequestParam int limit){

        CursorPageResponse<MyLocalBoardPostResponse> response =
                localBoardHistoryService.localBoardPostHistory(userDetails.getId(), cursor,limit,filterRange);

        return ResponseEntity.ok(response);
    }

    // 작성한 댓글 목록 불러오기
    @GetMapping("/localBoard/comment/{filterRange}")
    public ResponseEntity<CursorPageResponse<MyLocalBoardCommentResponse>> localBoardCommentHistory
            (@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable int filterRange,
             @RequestParam(required = false) Long cursor, @RequestParam int limit){

        CursorPageResponse<MyLocalBoardCommentResponse> response =
                localBoardHistoryService.localBoardCommentHistory(userDetails.getId(), cursor,limit,filterRange);

        return ResponseEntity.ok(response);
    }

    //  나눔중인 목록 조회
    @GetMapping("/sharing/post/{filterRange}")
    public ResponseEntity<CursorPageResponse<MySharingActivityResponse>> mySharingHistory
            (@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable int filterRange,
             @RequestParam(required = false)Long cursor, @RequestParam int limit){
        CursorPageResponse<MySharingActivityResponse> response =
                sharingPostHistoryService.SharingHistory(userDetails.getId(),cursor,limit,filterRange);
        return ResponseEntity.ok(response);
    }

    // 나눔 게시글 취소하기 (상태 : AVAILABLE)
    @GetMapping("/sharing/cancel/{postId}")
    public ResponseEntity<HaehaeResponse<Void>> cancelSharing(@PathVariable Long postId){
        sharingPostHistoryService.cancelSharing(postId);
        return ResponseEntity.ok(HaehaeResponse.ok());
    }

    // 나눔 완료 처리 (상태 : RESERVED)
    @GetMapping("/sharing/complete/{postId}")
    public ResponseEntity<HaehaeResponse<Void>> completeSharing (@PathVariable Long postId){
        sharingPostHistoryService.completeSharing(postId);
        return ResponseEntity.ok(HaehaeResponse.ok());
    }
}
