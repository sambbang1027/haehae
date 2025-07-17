package com.example.backend.entity.report;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_penalties")
public class UserPenalty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_penalty_id")
    private Long id;

    @Column(name = "penalty_user_id")
    private Long penaltyUserId;

    @Column(name = "reason_code")
    private Long reasonCode;

    @Column(name = "start_at")
    private Timestamp startAt;

    @Column(name = "end_at")
    private Timestamp endAt;

    @Column(name ="created_at")
    private Timestamp createdAt;

}
