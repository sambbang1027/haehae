package com.example.backend.myActivity.controller;


import com.example.backend.myActivity.dto.MyLocalBoardPostResponse;
import com.example.backend.myActivity.dto.MyMissionHistoryResponse;
import com.example.backend.myActivity.service.LocalBoardHistoryService;
import com.example.backend.myActivity.service.MissionHistoryService;
import com.example.backend.pagination.response.CursorPageResponse;
import com.example.backend.security.CustomUserDetails;
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

    @GetMapping("/missionHistory/{filterRange}")
    public ResponseEntity<CursorPageResponse<MyMissionHistoryResponse>> missionHistory
            (@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable int filterRange,
             @RequestParam(required = false) Long cursor, @RequestParam int limit){
        CursorPageResponse<MyMissionHistoryResponse> responses =
                missionHistoryService.missionHistoryList(userDetails.getId(),cursor,limit, filterRange);

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/localBoard/post/{filterRange}")
    public ResponseEntity<CursorPageResponse<MyLocalBoardPostResponse>> localBoardPostHistory
            (@AuthenticationPrincipal CustomUserDetails userDetails, @PathVariable int filterRange,
             @RequestParam(required = false) Long cursor, @RequestParam int limit){

        CursorPageResponse<MyLocalBoardPostResponse> response =
                localBoardHistoryService.localBoardPostHistory(userDetails.getId(), cursor,limit,filterRange);

        return ResponseEntity.ok(response);
    }


}
