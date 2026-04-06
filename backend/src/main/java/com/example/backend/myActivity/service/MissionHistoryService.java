package com.example.backend.myActivity.service;

import com.example.backend.mission.userMissions.repository.UserMissionRepository;
import com.example.backend.myActivity.dto.MyMissionHistoryResponse;
import com.example.backend.pagination.response.CursorPageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MissionHistoryService {

    private final UserMissionRepository userMissionRepository;

    // 미션 히스토리 조회
    public CursorPageResponse<MyMissionHistoryResponse>missionHistoryList(Long userId, Long cursor,int limit ,int filterRange){

        int limitPlusOne = limit + 1;
        List<MyMissionHistoryResponse> history= userMissionRepository.getUserMissionHistory(userId, cursor, limitPlusOne ,filterRange);

        // 없으면 빈배열 반환
        if(history.isEmpty()){
            return new CursorPageResponse<>();
        }

        boolean hasNext = history.size() > limit;
        if(hasNext){
            history.remove(limit);
        }

        Long nextCursor = hasNext ? history.get(history.size() - 1).getMissionId() : null;
        System.out.println("서비스 : "+history);
        return new CursorPageResponse<>(history, nextCursor, hasNext);
    }

}
