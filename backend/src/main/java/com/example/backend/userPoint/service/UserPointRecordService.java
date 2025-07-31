package com.example.backend.userPoint.service;

import com.example.backend.userPoint.dto.request.UserPointRecordRequest;
import com.example.backend.userPoint.dto.response.UserPointRecordResponse;
import com.example.backend.userPoint.repository.UserPointRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserPointRecordService {

    private final UserPointRepository userPointRepository;

   public Slice<UserPointRecordResponse> userPointRecord(UserPointRecordRequest recordRequest){
        // 필터 값 예외처리
        List<Integer> validRanges = List.of(1, 3, 6, 12);
        if (!validRanges.contains(recordRequest.getFilterRange())) {
            throw new IllegalArgumentException("유효하지 않은 필터 값입니다.");
        }

        // 페이지 정보 검사
        if(recordRequest.getPage() < 0 || recordRequest.getSize() <= 0){
            throw new IllegalArgumentException("유효하지 않은 페이지 정보입니다.");
        }
        Pageable pageable = PageRequest.of(recordRequest.getPage(), recordRequest.getSize());

        Slice<UserPointRecordResponse> responses
                = userPointRepository.getUserPointRecord(recordRequest.getUserId(), recordRequest.getFilterRange(), pageable);

        if(responses.isEmpty()){
            return new SliceImpl<>(Collections.emptyList(),pageable, false);
        }
        return responses;
    }
}
