package com.example.backend.entity.user;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Table(name = "user_points")
@Entity
public class UserPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_point_id")
    private Long id;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "point_type")
    private String pointType;
    private Long amount;
    private String source;
    @Column(name = "created_at")
    private Timestamp createdAt;

    @PrePersist
    protected void onCreate(){
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }
}
