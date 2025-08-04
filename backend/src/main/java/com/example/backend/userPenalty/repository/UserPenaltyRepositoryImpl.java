package com.example.backend.userPenalty.repository;

import com.example.backend.entity.report.QUserPenalty;
import com.example.backend.entity.report.UserPenalty;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public class UserPenaltyRepositoryImpl implements UserPenaltyCustom {
    private final JPAQueryFactory queryFactory;

      QUserPenalty up = QUserPenalty.userPenalty;
    public UserPenaltyRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }


    @Override
    public Timestamp existEndAtUserId(Long penaltyUserId, UserPenalty.PenaltyStatus penaltyStatus) {
        return queryFactory
                .select(up.endAt)
                .from(up)
                .where(up.penaltyUserId.eq(penaltyUserId),
                        up.penaltyStatus.eq(penaltyStatus)
                )
                .orderBy(up.endAt.desc())
                .limit(1)
                .fetchOne();
    }
}
