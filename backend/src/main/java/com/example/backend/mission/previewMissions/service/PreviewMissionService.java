package com.example.backend.mission.previewMissions.service;

import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.mission.previewMissions.dto.request.PreviewMissionRequestDTO;
import com.example.backend.mission.previewMissions.dto.request.PreviewMissionUpdateRequestDTO;
import com.example.backend.mission.previewMissions.dto.response.PreviewMissionListAndUserStatusDTO;
import com.example.backend.mission.previewMissions.dto.response.PreviewMissionListResponseDTO;

import java.util.List;

public interface PreviewMissionService {
    List<PreviewMissionListResponseDTO> findPreviewALlActive();
    void previewMissionInsert(PreviewMissionRequestDTO dto);
    void previewMissionUpdate(PreviewMissionUpdateRequestDTO dto);
    void previewDeleteById(Long id);
    void previewDeleteByType(PreviewMissions.PreviewMissionType previewMissionType,
                             PreviewMissions.PreviewMissionStatus previewMissionStatus);
    List<PreviewMissionListAndUserStatusDTO> userPreviewMissionAndStatus(Long userId);
}
