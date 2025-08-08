package com.example.backend.myActivity.service;

import com.example.backend.myActivity.dto.MyLocalBoardPostResponse;
import com.example.backend.myActivity.repository.localboard.MyLocalBoardRepository;
import com.example.backend.pagination.response.CursorPageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class LocalBoardHistoryService {

    private final MyLocalBoardRepository localBoardRepository;

    public CursorPageResponse<MyLocalBoardPostResponse> localBoardPostHistory
            (Long userId, Long cursor, int limit, int filterRange){

        int limitPlusOne = limit + 1;
        List<MyLocalBoardPostResponse> history =
                localBoardRepository.findLocalBoardPostList(userId, cursor, limitPlusOne, filterRange);

        // 값이 없으면 빈 값으로 내보내기
        if(history.isEmpty()){
            new CursorPageResponse<>();
        }

        boolean hasNext = history.size() > limit;
        // 다음 장의 여부 확인 한 것을 다시 삭제
        if(hasNext){
            history.remove(limit);
        }

        Long nextCursor = hasNext? history.get(history.size() -1).getPostId() : null;

        System.out.println("서비스" + history);
        return new CursorPageResponse<>(history, nextCursor, hasNext);
    }

}
