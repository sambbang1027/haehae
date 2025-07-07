package com.example.backend.mission.previewMissions.service;

import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.mission.previewMissions.dto.response.PreViewMissionStatusResponseDTO;
import com.example.backend.mission.previewMissions.dto.response.PreviewMissionListResponseDTO;

import java.util.List;

public interface PreviewMissionService {
//    void missionPreviewWeekly();
//    void missionPreviewDaily();
//    void missionWeeklyUpdate();
//    void missionDailyUpdate();
    List<PreviewMissionListResponseDTO> findPreviewALlActive();


}
