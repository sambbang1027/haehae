package com.example.backend.myActivity.repository.localboard;

import com.example.backend.entity.localBoard.QLocalBoardImages;
import com.example.backend.entity.localBoard.QLocalBoards;
import com.example.backend.myActivity.dto.MyLocalBoardPostResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class MyLocalBoardRepositoryImpl implements MyLocalBoardCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<MyLocalBoardPostResponse>findLocalBoardPostList
            (Long userId, Long cursor, int limitOnePlus, int filterRange){
        QLocalBoards lb = QLocalBoards.localBoards;
        QLocalBoardImages image = QLocalBoardImages.localBoardImages;
        LocalDateTime now = LocalDateTime.now();

        BooleanExpression dateCondition = null;

        if (filterRange > 0) {
            LocalDateTime start = now.minusMonths(filterRange).with(LocalTime.MIN);
            LocalDateTime end = now.with(LocalTime.MAX);
            dateCondition = lb.createdAt.between(Timestamp.valueOf(start), Timestamp.valueOf(end));
        }


        List<MyLocalBoardPostResponse> responses = jpaQueryFactory
                .select(Projections.constructor(MyLocalBoardPostResponse.class,
                                lb.localBoardId, lb.title, lb.createdAt,
                        JPAExpressions.select(image.localBoardImgUrl)
                                .from(image)
                                .where(image.localBoardId.eq(lb.localBoardId))
                                .orderBy(image.localBoardImageId.asc())
                                .limit(1)))
                .from(lb)
                .where(lb.userId.eq(userId)
                        ,dateCondition
                        , cursor != null ? lb.localBoardId.lt(cursor): null)
                .orderBy(lb.createdAt.desc())
                .limit(limitOnePlus)
                .fetch();

        return responses;
    }
}
