package com.example.backend.entity;

import com.example.backend.user.vo.Email;
import com.example.backend.user.vo.Nickname;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "users")
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;
    @Column(name = "user_level_id")
    private Long userLevelId;
    private String email;
    private String name;
    @Column(name = "password_hash")
    private String passwordHash;
    private String  nickname;
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
    @Column(name = "provider_id")
    private String providerId;
    private String bcode;
    @Column(name = "phone_number")
    private String phoneNumber;
    private LocalDate birth;
}
