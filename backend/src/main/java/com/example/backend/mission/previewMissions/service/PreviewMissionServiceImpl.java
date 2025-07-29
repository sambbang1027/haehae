package com.example.backend.mission.previewMissions.service;

import com.example.backend.entity.mission.Missions;
import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.mission.missions.dto.response.MissionPreviewDTO;
import com.example.backend.mission.missions.repsository.MissionsRepository;
import com.example.backend.mission.previewMissions.dto.request.PreviewMissionRequestDTO;
import com.example.backend.mission.previewMissions.dto.request.PreviewMissionUpdateRequestDTO;
import com.example.backend.mission.previewMissions.dto.response.PreViewMissionStatusResponseDTO;
import com.example.backend.mission.previewMissions.dto.response.PreviewMissionListAndUserStatusDTO;
import com.example.backend.mission.previewMissions.dto.response.PreviewMissionListResponseDTO;
import com.example.backend.mission.previewMissions.repository.PreviewMissionRepository;
import com.example.backend.mission.userMissionStatus.service.UserMissionStatusService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class PreviewMissionServiceImpl implements  PreviewMissionService {
    private final PreviewMissionRepository previewMissionRepository;
    private final MissionsRepository missionsRepository;

    public PreviewMissionServiceImpl(PreviewMissionRepository previewMissionRepository, MissionsRepository missionsRepository) {
        this.previewMissionRepository = previewMissionRepository;
        this.missionsRepository = missionsRepository;
    }

    @Transactional
    @Scheduled(cron = "0 0 9 * * MON") // 매주 월요일 오전 9시 0 0 9 * * MON
    public void scheduledWeeklyMission(){
        if(previewMissionRepository.existByActiveMission(PreviewMissions.PreviewMissionStatus.ACTIVE, PreviewMissions.PreviewMissionType.WEEKLY)) {
            missionWeeklyActiveUpdate();
        }
        if(previewMissionRepository.existByActiveMission(PreviewMissions.PreviewMissionStatus.UPCOMING, PreviewMissions.PreviewMissionType.WEEKLY)) {
            missionWeeklyUpcomingUpdate();
            missionPreviewWeekly(PreviewMissions.PreviewMissionStatus.UPCOMING);
        }else {
            missionPreviewWeekly(PreviewMissions.PreviewMissionStatus.ACTIVE);
            missionPreviewWeekly(PreviewMissions.PreviewMissionStatus.UPCOMING);
        }
        expiredWeeklyMissionDelete();
    }

    @Transactional
    @Scheduled(cron = "0 0 9 * * *") // 매일 9시  0 0 9 * * *
    public void scheduledDailyMission(){
        if(previewMissionRepository.existByActiveMission(PreviewMissions.PreviewMissionStatus.ACTIVE, PreviewMissions.PreviewMissionType.DAILY)) {
            missionDailyActiveUpdate();
        }
        if(previewMissionRepository.existByActiveMission(PreviewMissions.PreviewMissionStatus.UPCOMING, PreviewMissions.PreviewMissionType.DAILY)) {
            missionDailyUpcomingUpdate();
            missionPreviewDaily(PreviewMissions.PreviewMissionStatus.UPCOMING);
        }else {
            missionPreviewDaily(PreviewMissions.PreviewMissionStatus.ACTIVE);
            missionPreviewDaily(PreviewMissions.PreviewMissionStatus.UPCOMING);
        }
        expiredDailyMissionDaily();
    }


    //사용자에게 보여줄 주간 미션 저장
    @Transactional
    private void missionPreviewWeekly(PreviewMissions.PreviewMissionStatus status) {
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
            Timestamp startAt;
            Timestamp endAt;
            if(status == PreviewMissions.PreviewMissionStatus.UPCOMING) {
                startAt = (Timestamp.valueOf(LocalDateTime.now().plusWeeks(1)));
                endAt = (Timestamp.valueOf(LocalDateTime.now().plusWeeks(2)));
            }else{
                startAt = (Timestamp.valueOf(LocalDateTime.now()));
                endAt = (Timestamp.valueOf(LocalDateTime.now().plusWeeks(1)));
            }
            PreviewMissionRequestDTO requestDTO = new PreviewMissionRequestDTO(
                    dto.getId(),
                    PreviewMissions.PreviewMissionType.WEEKLY,
                    dto.getMissionContent(),
                    dto.getMissionPoint(),
                    PreviewMissions.PreviewMissionCategory.valueOf(dto.getMissionCategory().name()),
                    startAt,
                    endAt,
                    status,
                    dto.getQuantityCondition()
            );
            previewMissionRepository.save(requestDTO.toPreviewMissionEntity());
        }
    }

    //사용자에게 보여줄 일일 미션 저장
    @Transactional
    private void missionPreviewDaily(PreviewMissions.PreviewMissionStatus status) {
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
            Timestamp startAt;
            Timestamp endAt;
            if(status == PreviewMissions.PreviewMissionStatus.UPCOMING) {
                 startAt = (Timestamp.valueOf(LocalDateTime.now().plusDays(1)));
                 endAt = (Timestamp.valueOf(LocalDateTime.now().plusDays(2)));
            }else{
                startAt = (Timestamp.valueOf(LocalDateTime.now()));
                endAt = (Timestamp.valueOf(LocalDateTime.now().plusDays(1)));
            }
            PreviewMissionRequestDTO requestDTO = new PreviewMissionRequestDTO(
                    dto.getId(),
                    PreviewMissions.PreviewMissionType.DAILY,
                    dto.getMissionContent(),
                    dto.getMissionPoint(),
                    PreviewMissions.PreviewMissionCategory.valueOf(dto.getMissionCategory().name()),
                    startAt,
                    endAt,
                    status,
                    dto.getQuantityCondition());

            previewMissionRepository.save(requestDTO.toPreviewMissionEntity());
        }
    }

    // 매주 PreviewMission 상태 업데이트
    // 1. ACTIVE -> EXPIRED 상태 변경
    private void missionWeeklyActiveUpdate() {
       List<PreViewMissionStatusResponseDTO> dtoActiveList =  previewMissionRepository.findPreviewStatusList(PreviewMissions.PreviewMissionStatus.ACTIVE, PreviewMissions.PreviewMissionType.WEEKLY);

       for(PreViewMissionStatusResponseDTO dto : dtoActiveList){
           previewMissionRepository.updateMissionStatus(PreviewMissions.PreviewMissionStatus.EXPIRED, dto.getId());
       }

    }
    // 2. UPCOMING -> ACTIVE
    private void missionWeeklyUpcomingUpdate(){
        List<PreViewMissionStatusResponseDTO> dtoUpComingList =  previewMissionRepository.findPreviewStatusList(PreviewMissions.PreviewMissionStatus.UPCOMING, PreviewMissions.PreviewMissionType.WEEKLY);

        for(PreViewMissionStatusResponseDTO dto : dtoUpComingList){
            previewMissionRepository.updateMissionStatus(PreviewMissions.PreviewMissionStatus.ACTIVE, dto.getId());
        }
    }


    // 매일 PreviewMission 상태 업데이트
    // 1. ACTIVE -> EXPIRED 상태 변경
    private void missionDailyActiveUpdate() {
        List<PreViewMissionStatusResponseDTO> dtoActiveList =  previewMissionRepository.findPreviewStatusList(PreviewMissions.PreviewMissionStatus.ACTIVE, PreviewMissions.PreviewMissionType.DAILY);

        for(PreViewMissionStatusResponseDTO dto : dtoActiveList){
            previewMissionRepository.updateMissionStatus(PreviewMissions.PreviewMissionStatus.EXPIRED,dto.getId());
        }
    }
    // 2. UPCOMING -> ACTIVE
    private void missionDailyUpcomingUpdate(){
        List<PreViewMissionStatusResponseDTO> dtoUpComingList =  previewMissionRepository.findPreviewStatusList(PreviewMissions.PreviewMissionStatus.UPCOMING, PreviewMissions.PreviewMissionType.DAILY);

        for(PreViewMissionStatusResponseDTO dto : dtoUpComingList){
            previewMissionRepository.updateMissionStatus(PreviewMissions.PreviewMissionStatus.ACTIVE, dto.getId());
        }
    }

    // 만료된 PreviewMission 삭제
    // DB 저장공간으로 문제
    // 기준은 3주 이전 데이터 삭제.
    private void expiredWeeklyMissionDelete(){
        Timestamp threeWeeksAgo = Timestamp.valueOf(LocalDateTime.now().minusWeeks(3));
        previewMissionRepository.deleteExpiredPreviewMissions(threeWeeksAgo,
                PreviewMissions.PreviewMissionType.WEEKLY,
                PreviewMissions.PreviewMissionStatus.EXPIRED);
    }

    // 만료된 PreviewMission 삭제
    // 기준은 3일 이전 데이터 삭제.
    private void expiredDailyMissionDaily(){
      Timestamp threeDayAgo = Timestamp.valueOf(LocalDateTime.now().minusDays(3));
      previewMissionRepository.deleteExpiredPreviewMissions(threeDayAgo,
              PreviewMissions.PreviewMissionType.DAILY,
              PreviewMissions.PreviewMissionStatus.EXPIRED);
    }



    @Override
    public List<PreviewMissionListResponseDTO> findPreviewALlActive() {
        PreviewMissions.PreviewMissionStatus status = PreviewMissions.PreviewMissionStatus.ACTIVE;
        System.out.println("서비스 사용자 preview 미션 리스트");
        System.out.println(status);
        List<PreviewMissionListResponseDTO> list =  previewMissionRepository.findPreviewALlActive(status);
        System.out.println(list);
        if(list == null || list.isEmpty()){
            throw new IllegalArgumentException("미션이 존재 하지 않습니다.");
        }
        return list;
    }

    // 관리자가 직접 PreviewMissions 삽입,
    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void previewMissionInsert(PreviewMissionRequestDTO dto) {
        previewMissionRepository.save(dto.toPreviewMissionEntity());
    }

    // 관리자가 직접 수정
    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void previewMissionUpdate(PreviewMissionUpdateRequestDTO dto) {
        previewMissionRepository.save(dto.toPreviewMissionEntity());
    }

    // 관리자가 직접 삭제
    // 삭제시 프론트단에서 경고 모달 구현해야함!!
    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void previewDeleteById(Long id) {
        previewMissionRepository.deleteById(id);
    }

    // 관리자가 직접 삭제
    // 삭제시 프론트단에서 경고 모달 구현해야함!!
    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void previewDeleteByType(PreviewMissions.PreviewMissionType previewMissionType, PreviewMissions.PreviewMissionStatus previewMissionStatus) {
        previewMissionRepository.deleteByAllType(previewMissionType,previewMissionStatus);
    }

    // 미션과 유저의 미션상태를 함께 전달.
    @Override
    public List<PreviewMissionListAndUserStatusDTO> userPreviewMissionAndStatus(Long userId) {
       List<PreviewMissionListAndUserStatusDTO> list =  previewMissionRepository.userPreviewMissionAndStatus(PreviewMissions.PreviewMissionStatus.ACTIVE,userId);
       if(list == null || list.isEmpty()) {
           throw new IllegalArgumentException("미션이 존재 하지 않습니다.");
       }
       return list;
    }
}
