package com.example.backend.mission.missions.service;

import com.example.backend.entity.mission.Missions;
import com.example.backend.mission.missions.dto.request.MissionInsertRequestDTO;
import com.example.backend.mission.missions.dto.request.MissionUpdateRequestDTO;
import com.example.backend.mission.missions.dto.response.MissionResponseDTO;
import com.example.backend.mission.missions.repsository.MissionsRepository;
import com.example.backend.pagination.response.CursorPageResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MissionServiceImpl implements  MissionService {
    private final MissionsRepository missionsRepository;

    public MissionServiceImpl(MissionsRepository missionsRepository) {
        this.missionsRepository = missionsRepository;
    }

    // 관리자 미션 관리 조회
    @Override
    public CursorPageResponse<MissionResponseDTO> searchMissionsByConditionForAdmin(
                                                            Missions.MissionType missionType,
                                                            Missions.MissionCategory missionCategory,
                                                            String searchKeyword,
                                                            Long cursor, int limit) {
        int limitPlusOne = limit + 1;

        List<MissionResponseDTO> list = missionsRepository.searchMissionsByConditionForAdmin(
                                                                                            missionType,
                                                                                            missionCategory,
                                                                                            searchKeyword,
                                                                                            cursor,
                                                                                            limitPlusOne);

        boolean hasNext = list.size() > limit;

        if(hasNext){
            list.remove(limit);
        }

        Long nextCursor = hasNext ? list.get(list.size() - 1).getId() : null;
        return new CursorPageResponse<>(list, nextCursor ,hasNext);
    }

    // 미션 등록
    @Override
    public void missionInsert(MissionInsertRequestDTO dto) {
        if(missionsRepository.existsByMissionContent(dto.getMissionContent())){
            throw new IllegalArgumentException("해당 제목의 미션이 존재합니다.");
        }
        missionsRepository.save(dto.toMissionEntity());
    }

    // 미션 수정
    @Override
    public void missionUpdate(MissionUpdateRequestDTO dto) {
        if(missionsRepository.existsByMissionContentAndIdNot(dto.getMissionContent(), dto.getId())){
            throw new IllegalArgumentException("해당 제목의 미션이 존재합니다.");
        }
        missionsRepository.save(dto.toMissionEntity());
    }

    // 미션 삭제
    @Override
    public void missionDelete(Long id) {
        if(!missionsRepository.existsById(id)){
            throw new IllegalArgumentException("해당 미션이 존재 하지 않습니다.");
        }
        missionsRepository.deleteById(id);
    }

    // 미션 리스트 삭제
    @Override
    public void missionDeleteList(List<Long> idList) {
        if(idList == null || idList.isEmpty()){
            throw new IllegalArgumentException("삭제 할 미션을 선택하지 않았습니다.");
        }
        missionsRepository.deleteAllById(idList);
    }



}
