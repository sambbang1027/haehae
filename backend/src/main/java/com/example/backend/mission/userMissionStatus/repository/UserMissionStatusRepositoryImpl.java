package com.example.backend.mission.userMissionStatus.repository;

import com.example.backend.entity.mission.QUserMissionStatus;
import com.example.backend.entity.mission.UserMissionStatus;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
public class UserMissionStatusRepositoryImpl implements UserMissionStatusCustom{

    private final JPAQueryFactory jpaQueryFactory;

    public UserMissionStatusRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Transactional
    @Override
    public void userStatusUpdate(Long id, UserMissionStatus.MissionStatus status) {
       QUserMissionStatus ums = QUserMissionStatus.userMissionStatus;

            jpaQueryFactory.
                    update(ums)
                    .set(ums.missionStatus, status)
                    .where(ums.id.eq(id))
                    .execute();
    }
}
