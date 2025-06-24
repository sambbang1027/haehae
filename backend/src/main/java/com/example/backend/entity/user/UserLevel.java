package com.example.backend.entity.user;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
@Table(name = "user_levels")
@Entity
public class UserLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_level_id")
    private Long id;
    @Column(name = "level_name")
    private String levelName;
    @Column(name = "min_points")
    private Long minPoints;
}
