package com.example.backend.mission.previewMissions.repository;

import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.entity.mission.QPreviewMissions;
import com.example.backend.entity.mission.QUserMissionStatus;
import com.example.backend.mission.previewMissions.dto.response.PreviewMissionListAndUserStatusDTO;
import com.example.backend.mission.previewMissions.dto.response.QPreviewMissionListAndUserStatusDTO;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PreviewMissionRepositoryImpl implements PreviewMissionCustom{

    private final JPAQueryFactory jpaQueryFactory;

    public PreviewMissionRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }
    QPreviewMissions pm = QPreviewMissions.previewMissions;
    QUserMissionStatus um =QUserMissionStatus.userMissionStatus;
    @Override
    public void updateMissionStatus(PreviewMissions.PreviewMissionStatus status, Long id) {


        jpaQueryFactory
                .update(pm)
                .set(pm.previewMissionStatus, status)
                .where(pm.id.eq(id))
                .execute();
    }

    @Override
    public List<PreviewMissionListAndUserStatusDTO> userPreviewMissionAndStatus(PreviewMissions.PreviewMissionStatus status, Long userId) {
        BooleanBuilder builder = new BooleanBuilder();

        builder.and(pm.previewMissionStatus.eq(status));
        builder.and(um.userId.eq(userId));

        return jpaQueryFactory
                .select(new QPreviewMissionListAndUserStatusDTO(
                        pm.id,
                        pm.previewMissionContent,
                        pm.previewMissionPoint,
                        pm.previewMissionType,
                        um.id,
                        um.missionStatus
                        ))
                .from(pm)
                .leftJoin(um)
                .on(pm.id.eq(um.previewMissionId))
                .fetch();
    }
}
