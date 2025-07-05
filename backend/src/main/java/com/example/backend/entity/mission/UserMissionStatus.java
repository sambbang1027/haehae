package com.example.backend.entity.mission;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Table(name = "user_mission_status")
public class UserMissionStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_mission_status_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "mission_status")
    private MissionStatus missionStatus;

    public enum MissionStatus{
        PREVIEW,
        ACCEPTED,
        COMPLETED,
        FAILED,
        EXPIRED
    }

    @Column(name = "user_id")
    private Long userId; // 제약조건 안둠, 유저별로 구분해주기 위한 컬럼.

    @Column(name = "preview_mission_id")
    private Long previewMissionId;
}
