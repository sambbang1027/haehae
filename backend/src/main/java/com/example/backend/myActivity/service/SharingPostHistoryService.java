package com.example.backend.myActivity.service;

import com.example.backend.entity.sharing.SharingLogs;
import com.example.backend.entity.sharing.SharingPosts;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.myActivity.dto.MySharingActivityResponse;
import com.example.backend.myActivity.dto.SharingHistory;
import com.example.backend.myActivity.repository.sharing.MySharingRepository;
import com.example.backend.pagination.response.CursorPageResponse;
import com.example.backend.myActivity.repository.sharing.SharingLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SharingPostHistoryService {

    private final MySharingRepository mySharingRepository;
    private final SharingLogRepository sharingLogRepository;

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


    // 나눔중 게시글 삭제 처리
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

        SharingLogs logs = SharingLogs.builder()
                .sharingPostId(post.getSharingPostId())
                .buyUserId(post.getReservedUserId())
                .logType(SharingLogs.LogType.COMPLETED)
                .build();

        sharingLogRepository.save(logs);
    }

    /*
    * 나눔 히스토리 (나눔 받고 나눔 한 )
    * */
    public CursorPageResponse<SharingHistory> getSharingHistory(Long userId, Long cursor
    , int limit , int filterRange){

        LocalDateTime now = LocalDateTime.now();
        Timestamp start = null;
        Timestamp end = null;

        if (filterRange > 0) {
            start = Timestamp.valueOf(now.minusMonths(filterRange).with(LocalTime.MIN));
            end = Timestamp.valueOf(now.with(LocalTime.MAX));
        }

        List<SharingHistory> result=
         sharingLogRepository.findMySharingHistory(userId, cursor, limit + 1, filterRange, start, end);

        if(result.isEmpty()){
            return new CursorPageResponse<>();
        }

        // 다음장 여부 확인했던 부분 다시 삭제
        boolean hasNext = result.size() > limit;
        if(hasNext) {
            result.remove(limit);
        }

        Long nextCursor = hasNext ? result.get(result.size()-1).getHistoryId() : null;

        System.out.println("Service ::::::: "+ result);

        return new CursorPageResponse<>(result, nextCursor, hasNext);
    }

}
