package com.example.backend.mission.userMissions.repository;

import com.example.backend.entity.mission.QUserMissions;
import com.example.backend.entity.user.QUserPoint;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public class UserMissionRepositoryImpl implements UserMissionCustom{

    private final JPAQueryFactory jpaQueryFactory;

    public UserMissionRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public Long countUserMission(Long userId, Timestamp startAt, Timestamp endAt) {
        QUserMissions um = QUserMissions.userMissions;
        QUserPoint up = QUserPoint.userPoint;

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(up.userId.eq(userId));
        builder.and(um.completedAt.between(startAt,endAt));

        return jpaQueryFactory
                .select(um.count())
                .from(um)
                .join(up)
                .on(um.userPointId.eq(up.id))
                .where(builder)
                .fetchOne();
    }
}
