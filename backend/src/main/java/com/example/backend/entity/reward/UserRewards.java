package com.example.backend.entity.reward;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_rewards")
public class UserRewards {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_reward_id")
    private long id;

    @Column(name = "user_id")
    private long userId;

    @Column(name = "reward_item_id")
    private long rewardItemId;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "issued_at")
    private Timestamp issuedAt;

    @PrePersist
    protected void onCreate(){
        this.issuedAt = new Timestamp(System.currentTimeMillis());
    }

    public enum Status{
        AVAILABLE,
        USED,
        EXPIRED

    }
}
