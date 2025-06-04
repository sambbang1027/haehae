package com.example.backend.entity.mission;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Table(name = "missions")
public class Missions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mission_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "mission_type", nullable = false)
    private MissionType missionType;

    @Column(name = "mission_content")
    private String missionContent;

    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "mission_category" , nullable = false)
    private MissionCategory missionCategory;

    public enum MissionType {
        DAILY,
        WEEKLY
    }

    public enum MissionCategory {
        VOLUNTEER,
        POST,
        COMMENT,
        SHARING,
        REWARD
    }

}
