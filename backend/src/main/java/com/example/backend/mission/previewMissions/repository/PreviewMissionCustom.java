package com.example.backend.mission.previewMissions.repository;

import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.mission.previewMissions.dto.response.PreviewMissionListAndUserStatusDTO;

import java.util.List;

public interface PreviewMissionCustom {
   void updateMissionStatus(PreviewMissions.PreviewMissionStatus status, Long id);
   List<PreviewMissionListAndUserStatusDTO> userPreviewMissionAndStatus (PreviewMissions.PreviewMissionStatus status, Long userId);
}
