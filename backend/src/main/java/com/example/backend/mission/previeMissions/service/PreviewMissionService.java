package com.example.backend.mission.previeMissions.service;

import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.mission.previeMissions.dto.response.PreviewMissionListResponseDTO;

import java.util.List;

public interface PreviewMissionService {
    List<PreviewMissionListResponseDTO> findPreviewALl();
}
