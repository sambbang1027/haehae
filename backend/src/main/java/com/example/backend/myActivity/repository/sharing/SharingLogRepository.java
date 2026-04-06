package com.example.backend.myActivity.repository.sharing;

import com.example.backend.entity.sharing.SharingLogs;
import com.example.backend.myActivity.dto.SharingHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface SharingLogRepository extends JpaRepository<SharingLogs, Long> {

//
//    @Query(value = """
//            select
//                p.sharing_post_id as historyId,
//                p.title,
//                p.created_at as createdAt,
//                '나눴습니다' as statusType
//            from sharing_posts p
//            where p.user_id = :userId
//
//            union all
//
//            select
//                lo.sharing_log_id as historyId,
//                p.title,
//                lo.created_at as createdAt,
//                '받았습니다' as statusType
//            from sharing_logs lo
//            join sharing_posts p on p.sharing_post_id = lo.sharing_post_id
//            where lo.buy_user_id = :userId
//
//            order by historyId desc
//            """, nativeQuery = true)
//    List<SharingHistory> findMyActivities(@Param("userId") Long userId);

    @Query(value = """
            select *
            from (
                select 
                    p.sharing_post_id as historyId,
                    p.title as title,
                    p.created_at as createdAt,
                    '나눴습니다' as statusType
                from sharing_posts p
                where p.user_id = :userId
                  and p.status in ('AVAILABLE', 'RESERVED')
                  and (:filterRange = 0 or p.created_at between :startDate and :endDate)
            
                union all
            
   
                select 
                    lo.sharing_log_id as historyId,
                    p.title as title,
                    lo.created_at as createdAt,
                    '받았습니다' as statusType
                from sharing_logs lo
                join sharing_posts p on p.sharing_post_id = lo.sharing_post_id
                where lo.buy_user_id = :userId
                  and (:filterRange = 0 or lo.created_at between :startDate and :endDate)
            ) as all_histories
            where (:cursor is null or historyId < :cursor)  
            order by historyId desc
            limit :limitPlusOne
            """, nativeQuery = true)
    List<SharingHistory> findMySharingHistory(
            @Param("userId") Long userId,
            @Param("cursor") Long cursor,
            @Param("limitPlusOne") int limitPlusOne,
            @Param("filterRange") int filterRange,
            @Param("startDate") Timestamp startDate,
            @Param("endDate") Timestamp endDate
    );
}