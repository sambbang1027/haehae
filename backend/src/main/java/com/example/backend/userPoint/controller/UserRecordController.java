package com.example.backend.userPoint.controller;

import com.example.backend.common.response.HaehaeResponse;
import com.example.backend.userPoint.dto.request.UserPointRecordRequest;
import com.example.backend.userPoint.dto.response.UserPointRecordResponse;
import com.example.backend.userPoint.service.UserPointRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/point")
public class UserRecordController {

    private final UserPointRecordService recordService;

    @PostMapping("/record")
    public ResponseEntity<HaehaeResponse<Slice<UserPointRecordResponse>>> userPointRecordList
            (@RequestBody UserPointRecordRequest recordRequest){
        Slice<UserPointRecordResponse> responses = recordService.userPointRecord(recordRequest);
        return ResponseEntity.ok(HaehaeResponse.ok(responses));
    }
}
