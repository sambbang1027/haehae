package com.example.backend.entity.user;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;
import java.time.LocalDate;

@EntityListeners(AuditingEntityListener.class)
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

    @Builder.Default
    @Column(name = "user_level_id")
    private Long userLevelId = 1L;
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
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.USER;
    public enum Role {
        USER,
        ADMIN
    }
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;
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
