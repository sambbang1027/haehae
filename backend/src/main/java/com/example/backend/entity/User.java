package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;
import java.sql.Timestamp;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "users")
@Entity
public class User {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;
    @Column(name = "user_level_id")
    private Long userLevelId;
    private String email;
    private String name;
    @Column(name = "password_hash")
    private String passwordHash;
    private String nickname;
    @Column(name = "profile_image_url")
    private String profileImageUrl;
    @Column(name = "social_provider")
    private String socialProvider;
    private String address;
    @Column(name = "created_at")
    private Timestamp createdAt;
    @Enumerated(EnumType.STRING)
    private Role role;
    public enum Role {
        USER,
        ADMIN
    }
    @Enumerated(EnumType.STRING)
    private Status status;
    public enum Status{
        ACTIVE,
        BLOCKED,
        INACTIVE
    }
    @Column(name = "deleted_at")
    private Timestamp deletedAt;
    @Enumerated(EnumType.STRING)
    private ResidenceType residenceType;
    public enum ResidenceType{
        APT_OFFICETEL,
        HOUSE_VILLA
    }
    @Column(name = "current_point")
    private Long currentPoint;
    @Column(name = "total_point")
    private Long totalPoint;
}
