package com.example.backend.mission.previeMissions;

import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.mission.previeMissions.dto.response.PreviewMissionListResponseDTO;
import com.example.backend.mission.previeMissions.service.PreviewMissionService;
import com.google.api.Http;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/previewMission")
public class controller {

    private final PreviewMissionService previewMissionService;

    public controller(PreviewMissionService previewMissionService) {
        this.previewMissionService = previewMissionService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<PreviewMissionListResponseDTO>> findAllActiveMission(){
        List<PreviewMissionListResponseDTO> missionList= previewMissionService.findPreviewALl();
        return new ResponseEntity<>(missionList, HttpStatus.OK);
    }

}
