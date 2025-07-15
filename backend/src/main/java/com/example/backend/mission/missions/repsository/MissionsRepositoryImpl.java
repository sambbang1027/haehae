package com.example.backend.mission.missions.repsository;

import com.example.backend.entity.mission.Missions;
import com.example.backend.entity.mission.QMissions;
import com.example.backend.mission.missions.dto.response.MissionResponseDTO;
import com.example.backend.mission.missions.dto.response.QMissionResponseDTO;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MissionsRepositoryImpl implements MissionsRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;
    private final QMissions missions = QMissions.missions;

    public MissionsRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }


    @Override
    public List<MissionResponseDTO> searchMissionsByConditionForAdmin(
                                                Missions.MissionType missionType,
                                                Missions.MissionCategory missionCategory,
                                                String searchKeyword,
                                                Long cursor,
                                                int limitPlusOne
    ) {

        BooleanBuilder builder = new BooleanBuilder();

        if(missionType != null){
            builder.and(missions.missionType.eq(missionType));
        }
        if(missionCategory != null){
            builder.and(missions.missionCategory.eq(missionCategory));
        }
        if(searchKeyword != null && !searchKeyword.isEmpty()){
            builder.and(missions.missionContent.containsIgnoreCase(searchKeyword));
        }
        if(cursor != null){
            builder.and(missions.id.lt(cursor));
        }

        return jpaQueryFactory
                .select(new QMissionResponseDTO(
                        missions.id,
                        missions.missionType,
                        missions.missionContent,
                        missions.createdAt,
                        missions.missionCategory,
                        missions.missionPoint
                )).from(missions)
                .where(builder)
                .orderBy(missions.id.desc())
                .limit(limitPlusOne)
                .fetch();
    }
}
