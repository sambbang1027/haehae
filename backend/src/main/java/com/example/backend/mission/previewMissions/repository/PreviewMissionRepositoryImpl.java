package com.example.backend.mission.previewMissions.repository;

import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.entity.mission.QPreviewMissions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

@Repository
public class PreviewMissionRepositoryImpl implements PreviewMissionCustom{

    private final JPAQueryFactory jpaQueryFactory;

    public PreviewMissionRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public void updateMissionStatus(PreviewMissions.PreviewMissionStatus status, Long id) {
        QPreviewMissions pm = QPreviewMissions.previewMissions;

        jpaQueryFactory.
                update(pm)
                .set(pm.previewMissionStatus, status)
                .where(pm.id.eq(id))
                .execute();
    }
}
