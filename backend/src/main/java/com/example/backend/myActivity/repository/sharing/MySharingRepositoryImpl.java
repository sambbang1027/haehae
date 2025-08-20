package com.example.backend.myActivity.repository.sharing;

import com.example.backend.entity.sharing.QSharingPosts;
import com.example.backend.entity.sharing.SharingPosts;
import com.example.backend.myActivity.dto.MySharingActivityResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MySharingRepositoryImpl implements MySharingCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;

    /**
     * 나눔중에 올린 게시글을 불러오기
     * */
    @Override
    public List<MySharingActivityResponse> findSharingPosts
            (Long userId, Long cursor, int limitPlusOne, int filterRange){
        QSharingPosts sp = QSharingPosts.sharingPosts;

        LocalDateTime now = LocalDateTime.now();
        BooleanExpression dateExpression = null;

        if(filterRange > 0){
            LocalDateTime start = now.minusMonths(filterRange).with(LocalTime.MIN);
            LocalDateTime end = now.with(LocalTime.MAX);
            dateExpression = sp.createdAt.between(Timestamp.valueOf(start), Timestamp.valueOf(end));
        }

        return jpaQueryFactory
                .select(Projections.constructor(MySharingActivityResponse.class
                , sp.sharingPostId, sp.title, sp.status, sp.createdAt))
                .from(sp)
                .where(sp.userId.eq(userId)
                        , sp.status.in(SharingPosts.Status.AVAILABLE, SharingPosts.Status.RESERVED)
                        , dateExpression
                        , cursor != null ? sp.sharingPostId.lt(cursor) : null)
                .orderBy(sp.sharingPostId.desc())
                .limit(limitPlusOne)
                .fetch();

    }

}
