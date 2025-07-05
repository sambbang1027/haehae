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
    @Column(name = "mission_category" , nullable = false, length = 20)
    private MissionCategory missionCategory;

    @Column(name = "mission_point")
    private Long missionPoint;

    public enum MissionType {
        DAILY,
        WEEKLY
    }
    // 1.봉사 2. 게시물 3. 댓글 4. 나눔 5. 리워드상품 6. 미션 7.기타
    public enum MissionCategory {
        VOLUNTEER,
        POST,
        COMMENT,
        SHARING,
        REWARD,
        MISSION
    }

}
