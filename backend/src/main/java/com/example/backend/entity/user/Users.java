package com.example.backend.entity.user;

import com.example.backend.entity.localBoard.Comments;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_level_id", nullable = false)
    private Long userLevelId;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "name", nullable = false, length = 20)
    private String name;

    @Column(name = "password_hash", nullable = false, length = 225)
    private String passwordHash;

    @Column(name = "nickname", nullable = false, unique = true, length = 20)
    private String nickname;

    @Column(name = "profile_image_url", length = 2048)
    private String profileImageUrl;

    @Column(name = "social_provider", length = 20)
    private String socialProvider;

    @Column(name = "address", nullable = false, length = 225)
    private String address;

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, columnDefinition = "ENUM('ADMIN','USER') DEFAULT 'USER'")
    private Role role = Role.USER;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, columnDefinition = "ENUM('ACTIVE','BLOCKED','INACTIVE') DEFAULT 'ACTIVE'")
    private Status status = Status.ACTIVE;

    @Column(name = "deleted_at")
    private Timestamp deletedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "residence_type", nullable = false, columnDefinition = "ENUM('APT','OFFICETEL','HOUSE_VILLA')")
    private ResidenceType residenceType;

    @Column(name = "current_point", nullable = false)
    private Integer currentPoint = 0;

    @Column(name = "total_point", nullable = false)
    private Integer totalPoint = 0;

    public enum Role {
        ADMIN, USER
    }

    public enum Status {
        ACTIVE, BLOCKED, INACTIVE
    }

    public enum ResidenceType {
        APT, OFFICETEL, HOUSE_VILLA
    }


    @PrePersist
    public void prePersist() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }
}
