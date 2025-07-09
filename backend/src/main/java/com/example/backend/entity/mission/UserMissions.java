package com.example.backend.entity.mission;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "user_missions")
public class UserMissions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_mission_id")
    private Long id;

    @Column(name = "user_point_id")
    private Long userPointId;

    @Column(name = "completed_at")
    private Timestamp completedAt;

    @Column(name= "user_mission_status_id")
    private Long userMissionStatusId;
    // 연관관계는 끊음 , 독자적 로그 테이블

    @PrePersist
    protected void onCreate(){
        this.completedAt = new Timestamp(System.currentTimeMillis());
    }

}
