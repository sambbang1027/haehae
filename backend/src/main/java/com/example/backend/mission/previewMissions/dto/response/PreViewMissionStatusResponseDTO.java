package com.example.backend.mission.previewMissions.dto.response;

import com.example.backend.entity.mission.PreviewMissions;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PreViewMissionStatusResponseDTO {
    private Long id;
    private PreviewMissions.PreviewMissionStatus previewMissionStatus;

   public PreViewMissionStatusResponseDTO(Long id, PreviewMissions.PreviewMissionStatus previewMissionStatus){
       this.id=id;
       this.previewMissionStatus = previewMissionStatus;
   }
}
