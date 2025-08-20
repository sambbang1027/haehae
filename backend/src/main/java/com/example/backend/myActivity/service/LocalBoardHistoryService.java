package com.example.backend.myActivity.service;

import com.example.backend.myActivity.dto.MyLocalBoardCommentResponse;
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

    // 작성한 게시글 목록 불러오기
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

        System.out.println("service :::: " + history);
        return new CursorPageResponse<>(history, nextCursor, hasNext);
    }

    // 작성한 댓글 목록 불러오기
    public CursorPageResponse<MyLocalBoardCommentResponse> localBoardCommentHistory
        (Long userId, Long cursor, int limit, int filterRange){

        int limitPlusOne = limit + 1;
        List<MyLocalBoardCommentResponse> history =
                localBoardRepository.findLocalBoardCommentList(userId, cursor, limitPlusOne, filterRange);

        // 작성한 댓글이 없을 경우
        if(history.isEmpty()){
            new CursorPageResponse<>();
        }

        // 다음 장의 여뷰 확인 했던 것을 다시 삭제
        boolean hasNext = history.size() > limit;
        if(hasNext){
            history.remove(limit);
        }

        Long nextCursor = hasNext? history.get(history.size() -1).getCommentId() : null;

        System.out.println("service :::: " + history);

        return new CursorPageResponse<>(history, nextCursor, hasNext);
    }
}
