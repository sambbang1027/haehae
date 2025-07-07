package com.example.backend.mission.previewMissions.repository;

import com.example.backend.entity.mission.PreviewMissions;

public interface PreviewMissionCustom {
   void updateMissionStatus(PreviewMissions.PreviewMissionStatus status, Long id);
}
