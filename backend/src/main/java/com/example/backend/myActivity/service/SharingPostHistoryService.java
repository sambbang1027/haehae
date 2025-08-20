package com.example.backend.myActivity.service;

import com.example.backend.entity.sharing.SharingPosts;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.myActivity.dto.MySharingActivityResponse;
import com.example.backend.myActivity.repository.sharing.MySharingRepository;
import com.example.backend.pagination.response.CursorPageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SharingPostHistoryService {

    private final MySharingRepository mySharingRepository;

    /**
     * 나눔중/예약중 내역 불러오기
     * */
    public CursorPageResponse<MySharingActivityResponse> SharingHistory
    (Long userId, Long cursor, int limit , int filterRange){

        int limitPlusOne = limit + 1;

        List<MySharingActivityResponse> result =
                mySharingRepository.findSharingPosts(userId, cursor, limitPlusOne, filterRange);

        // 정보가 없으면 빈값으로 반환
        if(result.isEmpty()){
            return new CursorPageResponse<>();
        }

        // 다음장 여부 확인했던 부분 다시 삭제
        boolean hasNext = result.size() > limit;
        if(hasNext) {
            result.remove(limit);
        }

        Long nextCursor = hasNext ? result.get(result.size()-1).getPostId() : null;

        System.out.println("Service ::::::: "+ result);

        return new CursorPageResponse<>(result, nextCursor, hasNext);
    }


    // 나눔 취소 처리
    @Transactional
    public void cancelSharing(Long postId){
        SharingPosts post = mySharingRepository.findById(postId)
                .orElseThrow(()-> new HaehaeException(ErrorCode.POST_NOT_FOUND));

        if(!post.getStatus().equals(SharingPosts.Status.AVAILABLE)){
            throw new IllegalArgumentException("나눔중이 아닌 글은 취소할 수 없음");
        }

        post.cancel();
    }

    // 나눔 완료 처리
    @Transactional
    public void completeSharing(Long postId){
        SharingPosts post = mySharingRepository.findById(postId)
                .orElseThrow(()->new HaehaeException(ErrorCode.POST_NOT_FOUND));

        if(!post.getStatus().equals(SharingPosts.Status.RESERVED)){
            throw new IllegalArgumentException("예약중인 글만 완료처리가 가능합니다.");
        }
        post.completed();
    }
}
