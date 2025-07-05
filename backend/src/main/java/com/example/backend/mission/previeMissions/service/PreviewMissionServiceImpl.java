package com.example.backend.mission.previeMissions.service;

import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.mission.previeMissions.dto.response.PreviewMissionListResponseDTO;
import com.example.backend.mission.previeMissions.repository.PreviewMissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PreviewMissionServiceImpl implements  PreviewMissionService {

    private final PreviewMissionRepository previewMissionRepository;

    public PreviewMissionServiceImpl(PreviewMissionRepository previewMissionRepository) {
        this.previewMissionRepository = previewMissionRepository;
    }

    @Override
    public List<PreviewMissionListResponseDTO> findPreviewALl() {
        List<PreviewMissionListResponseDTO> list =  previewMissionRepository.findPreviewALl(PreviewMissions.PreviewMissionStatus.ACTIVE);
        if(list == null || list.isEmpty()){
            throw new IllegalArgumentException("미션이 존재 하지 않습니다.");
        }
        return list;
    }
}
