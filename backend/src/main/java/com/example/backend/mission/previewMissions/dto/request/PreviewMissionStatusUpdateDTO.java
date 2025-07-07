package com.example.backend.mission.previewMissions.dto.request;

import com.example.backend.entity.mission.PreviewMissions;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
public class PreviewMissionStatusUpdateDTO {
    private Long id;
    private PreviewMissions.PreviewMissionStatus previewMissionStatus;

    public PreviewMissions toEntity(){
        return  PreviewMissions.builder()
                .id(id)
                .previewMissionStatus(previewMissionStatus)
                .build();
    }
}
