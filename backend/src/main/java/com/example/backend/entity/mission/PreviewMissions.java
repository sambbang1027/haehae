package com.example.backend.entity.mission;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Table(name = "preview_missions")
public class PreviewMissions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "preview_mission_id")
    private Long id;

    @Column(name = "mission_id")
    private Long missionId;
    // 외래키지만 관리자가 이벤트성 미션을 넣을 수 있으니 null 허용

    @Enumerated(EnumType.STRING)
    @Column(name = "preview_mission_type")
    private PreviewMissionType previewMissionType;

    @Column(name = "preview_mission_content")
    private String previewMissionContent;

    @Column(name = "preview_mission_point")
    private Long previewMissionPoint;

    @Enumerated(EnumType.STRING)
    @Column(name = "preview_mission_category")
    private PreviewMissionCategory previewMissionCategory;

    @Column(name = "assigned_at")
    private Timestamp assignedAt;

    @Column(name = "start_at")
    private Timestamp startAt;

    @Column(name = "end_at")
    private Timestamp endAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "preview_mission_status")
    private PreviewMissionStatus previewMissionStatus;


    @PrePersist
    protected void onCreate(){
        this.assignedAt = new Timestamp(System.currentTimeMillis());
    }

    public enum PreviewMissionType {
        DAILY,
        WEEKLY
    }

    public enum PreviewMissionCategory {
        VOLUNTEER,
        POST,
        COMMENT,
        SHARING,
        REWARD,
        MISSION
    }


    public enum PreviewMissionStatus {
        UPCOMING,
        ACTIVE,
        EXPIRED
    }
}
