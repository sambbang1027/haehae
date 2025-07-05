package com.example.backend.mission.missions.service;

import com.example.backend.entity.mission.Missions;
import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.mission.missions.dto.request.MissionInsertRequestDTO;
import com.example.backend.mission.missions.dto.request.MissionUpdateRequestDTO;
import com.example.backend.mission.missions.dto.response.MissionPreviewDTO;
import com.example.backend.mission.missions.dto.response.MissionResponseDTO;
import com.example.backend.mission.missions.repsository.MissionsRepository;
import com.example.backend.mission.previeMissions.dto.request.PreviewMissionRequestDTO;
import com.example.backend.mission.previeMissions.repository.PreviewMissionRepository;
import com.example.backend.pagination.response.CursorPageResponse;
import jakarta.transaction.Transactional;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class MissionServiceImpl implements  MissionService {
    private final MissionsRepository missionsRepository;
    private final PreviewMissionRepository previewMissionRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    public MissionServiceImpl(MissionsRepository missionsRepository, PreviewMissionRepository previewMissionRepository, RedisTemplate<String, Object> redisTemplate) {
        this.missionsRepository = missionsRepository;
        this.previewMissionRepository = previewMissionRepository;
        this.redisTemplate = redisTemplate;
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

    // 사용자에게 보여줄 주간 미션 저장
    @Override
    @Transactional
    public void missionPreviewWeekly() {
       List<MissionPreviewDTO> missionsList = missionsRepository.findWeeklyMissionPreview(Missions.MissionType.WEEKLY);
       Random random = new Random();

       //카테고리별로 분리 -> 카테고리가 키
       Map<Missions.MissionCategory, List<MissionPreviewDTO>> categoryWeeklyMap = new HashMap<>();

        for(MissionPreviewDTO categoryWeeklyList : missionsList){
            Missions.MissionCategory category = categoryWeeklyList.getMissionCategory();
            if(!categoryWeeklyMap.containsKey(category)){ // 카테고리를 키로 만들어주었다.
                categoryWeeklyMap.put(category, new ArrayList<>());
            }
            categoryWeeklyMap.get(category).add(categoryWeeklyList);
        }

        // 카테고리 중복 안되게 5개만
        List<MissionPreviewDTO> randomWeeklyList = new ArrayList<>();

        List<Missions.MissionCategory> categories = new ArrayList<>(categoryWeeklyMap.keySet());
        Collections.shuffle(categories);

        for(Missions.MissionCategory category : categories){
            List<MissionPreviewDTO> categoryMission = categoryWeeklyMap.get(category);
            if(categoryMission != null && !categoryMission.isEmpty()){
                MissionPreviewDTO randomList = categoryMission.get(random.nextInt(categoryMission.size()));
                randomWeeklyList.add(randomList);
            }
            if(randomWeeklyList.size() >= 5) { // 5개까지만
                break;
            }
        }

        for(MissionPreviewDTO dto : randomWeeklyList){ // 랜덤 미션 previewMissionRepository에 저장.
            PreviewMissionRequestDTO requestDTO = new PreviewMissionRequestDTO();
            requestDTO.setMissionId(dto.getId());
            requestDTO.setPreviewMissionType(PreviewMissions.PreviewMissionType.WEEKLY);
            requestDTO.setPreviewMissionContent(dto.getMissionContent());
            requestDTO.setPreviewMissionPoint(dto.getMissionPoint());
            requestDTO.setPreviewMissionCategory( PreviewMissions.PreviewMissionCategory.valueOf(dto.getMissionCategory().name()));
            requestDTO.setStartAt(Timestamp.valueOf(LocalDateTime.now()));
            requestDTO.setEndAt(Timestamp.valueOf(LocalDateTime.now().plusDays(7)));
            previewMissionRepository.save(requestDTO.toPreviewMissionEntity());
        }
    }
    
    //사용자에게 보여줄 일일 미션 저장
    @Override
    @Transactional
    public void missionPreviewDaily() {
        List<MissionPreviewDTO> dtoList = missionsRepository.findDailyMissionPreview(Missions.MissionType.DAILY);
        Random random = new Random();

        Map<Missions.MissionCategory, List<MissionPreviewDTO>> categoryDailyListMap = new HashMap<>();

        for(MissionPreviewDTO dto : dtoList){
            if(!(dto.getMissionCategory() == Missions.MissionCategory.VOLUNTEER)) {
                Missions.MissionCategory category = dto.getMissionCategory();
                if (!categoryDailyListMap.containsKey(category)) {
                    categoryDailyListMap.put(category, new ArrayList<>());
                }
                categoryDailyListMap.get(category).add(dto);
            }
        }

        List<MissionPreviewDTO> randomDailyList = new ArrayList<>();
        List<Missions.MissionCategory> categories = new ArrayList<>(categoryDailyListMap.keySet());
        Collections.shuffle(categories);

        for(Missions.MissionCategory category : categories){
            List<MissionPreviewDTO> categoryMission = categoryDailyListMap.get(category);
            if(categoryMission != null && !categoryMission.isEmpty()){
                MissionPreviewDTO randomList = categoryMission.get(random.nextInt(categoryMission.size()));
                randomDailyList.add(randomList);
            }
            // VOLUNTEER를 제거해서 5개.
        }
        for(MissionPreviewDTO dto : randomDailyList){
            PreviewMissionRequestDTO requestDTO = new PreviewMissionRequestDTO();
            requestDTO.setMissionId(dto.getId());
            requestDTO.setPreviewMissionType(PreviewMissions.PreviewMissionType.DAILY);
            requestDTO.setPreviewMissionContent(dto.getMissionContent());
            requestDTO.setPreviewMissionPoint(dto.getMissionPoint());
            requestDTO.setPreviewMissionCategory( PreviewMissions.PreviewMissionCategory.valueOf(dto.getMissionCategory().name()));
            requestDTO.setStartAt(Timestamp.valueOf(LocalDateTime.now()));
            requestDTO.setEndAt(Timestamp.valueOf(LocalDateTime.now().plusDays(1)));
            previewMissionRepository.save(requestDTO.toPreviewMissionEntity());
        }
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
