package com.example.backend.mission.missions.controller;

import com.example.backend.entity.mission.Missions;
import com.example.backend.mission.missions.dto.request.MissionInsertRequestDTO;
import com.example.backend.mission.missions.dto.request.MissionUpdateRequestDTO;
import com.example.backend.mission.missions.dto.response.MissionResponseDTO;
import com.example.backend.mission.missions.service.MissionService;
import com.example.backend.pagination.response.CursorPageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/mission")
public class MissionController {
    private final MissionService missionService;

    public MissionController(MissionService missionService) {
        this.missionService = missionService;
    }

    @GetMapping("/admin/list")
    public ResponseEntity<CursorPageResponse<MissionResponseDTO>> getMission(
                                                                    @RequestParam(required = false) Missions.MissionType missionType,
                                                                    @RequestParam(required = false) Missions.MissionCategory missionCategory,
                                                                    @RequestParam(required = false) String searchKeyword,
                                                                    @RequestParam(required = false) Long cursor,
                                                                    @RequestParam int limit
    ){
       CursorPageResponse<MissionResponseDTO> list =  missionService.searchMissionsByConditionForAdmin(missionType, missionCategory, searchKeyword, cursor, limit);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("insert")
    public ResponseEntity<String> insertMission(@RequestBody MissionInsertRequestDTO dto){
        missionService.missionInsert(dto);
        return new ResponseEntity<>("미션 등록 성공",HttpStatus.OK);
    }

    @PostMapping("update")
    public ResponseEntity<String> updateMission(@RequestBody MissionUpdateRequestDTO dto){
        missionService.missionUpdate(dto);
        return new ResponseEntity<>("미션 수정 완료" ,HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteMission(@PathVariable Long id){
        missionService.missionDelete(id);
        return new ResponseEntity<>("삭제 성공",HttpStatus.OK);
    }

    @DeleteMapping("delete/list")
    public ResponseEntity<String> deleteMissionList(@RequestParam List<Long> idList){
        missionService.missionDeleteList(idList);
        return new ResponseEntity<>("삭제 성공", HttpStatus.OK);
    }

}
