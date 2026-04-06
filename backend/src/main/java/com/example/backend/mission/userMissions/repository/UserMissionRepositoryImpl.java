package com.example.backend.mission.userMissions.repository;

import com.example.backend.entity.mission.QPreviewMissions;
import com.example.backend.entity.mission.QUserMissionStatus;
import com.example.backend.entity.mission.QUserMissions;
import com.example.backend.entity.user.QUserPoint;
import com.example.backend.myActivity.dto.MyMissionHistoryResponse;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

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

    // 유저 미션 활동 히스토리
    @Override
    public List<MyMissionHistoryResponse>getUserMissionHistory(Long userId, Long cursor, int limitPlusOne, int filterRange){
        QUserMissions uMission = QUserMissions.userMissions;
        QUserMissionStatus uMissionStatus = QUserMissionStatus.userMissionStatus;
        QPreviewMissions preMission = QPreviewMissions.previewMissions;
        LocalDateTime now = LocalDateTime.now();

        return jpaQueryFactory
                .select(Projections.constructor(MyMissionHistoryResponse.class
                        ,uMission.id
                        ,uMission.completedAt
                        ,preMission.previewMissionType
                        ,preMission.previewMissionContent
                        ,preMission.previewMissionPoint))
                .from(uMission)
                .join(uMissionStatus).on(uMission.userMissionStatusId.eq(uMissionStatus.id))
                .join(preMission).on(uMissionStatus.previewMissionId.eq(preMission.id))
                .where(uMissionStatus.userId.eq(userId),
                uMission.completedAt.between(Timestamp.valueOf(now.minusMonths(filterRange).with(LocalTime.MIN)),
                        Timestamp.valueOf(now.with(LocalTime.MAX))),
                        cursor != null ? uMission.id.lt(cursor): null )
                .limit(limitPlusOne)
                .fetch();
    }
}
