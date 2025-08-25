package com.example.backend.entity.sharing;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "sharing_logs")
public class SharingLogs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sharing_log_id")
    private Long id;

    // SharingPost 테이블 연관관계
    @Column(name = "sharing_post_id")
    private Long sharingPostId;

    // 구매한 유저아이디
    @Column(name = "buy_user_id")
    private Long buyUserId;

    @Enumerated(EnumType.STRING)
    @Column(name = "log_type")
    private LogType logType;

    @Column(name = "created_at")
    private Timestamp createdAt;


    public enum LogType {
        COMPLETED,
        CANCEL,
        REPORT
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

}
