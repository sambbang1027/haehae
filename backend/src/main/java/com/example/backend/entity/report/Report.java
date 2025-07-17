package com.example.backend.entity.report;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.tool.schema.TargetType;

import java.sql.Timestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long id;

    @Column(name = "reporter_id")
    private Long reporterId;

    @Enumerated(EnumType.STRING)
    @Column(name = "target_type")
    private TargetType targetType;

    @Column(name = "target_id")
    private Long targetId;

    @Column(name = "reason_code")
    private Long reasonCode;

    @Column(name = "details")
    private String details;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "created_at")
    private Timestamp createdAt;


    public enum TargetType{
        post,
        comment,
        chat_message,
        chat_room,
        sharing,
        sharing_log
    }

    public enum Status{
        PENDING,
        RESOLVED,
        REJECTED
    }

    @PrePersist
    protected void onCreate(){
        this.createdAt=new Timestamp(System.currentTimeMillis());
    }

}
