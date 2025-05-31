package com.example.backend.entity.user;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long id;

    @Column(name = "user_level_id")
    private long userLevelId;

    @Column(length = 100)
    private String email;

    @Column(length = 20)
    private String name;

    @Column(name = "password_hash")
    private String passwordHash;

    @Column(length = 20)
    private String nickName;

    @Column(name = "profile_image_url" , length = 2048)
    private String profileImageUrl;

    @Column(name="social_provider", length = 20)
    private String socialProvider;

    private String address;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Enumerated(EnumType.STRING)
    private Roll roll;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "deleted_at")
    private Timestamp deletedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "residenece_type")
    private ResideneceType resideneceType;

    @Column(name = "current_point")
    private long currentPoint;

    @Column(name = "total_point")
    private long totalPoint;


    public enum Roll{
        ADMIN,
        USER
    }

    public enum Status{
        ACTIVE,
        BLOCKED,
        INACTIVE
    }

    public enum ResideneceType {
        APT_OFFICETEL,
        HOUSE_VILLA
    }
}
