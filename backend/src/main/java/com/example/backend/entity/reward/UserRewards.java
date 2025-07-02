package com.example.backend.entity.reward;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Getter
@Table(name = "user_rewards")
public class UserRewards {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_reward_id")
    private long id;

    @Column(name = "reward_item_id")
    private long rewardItemId;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Status status;

    @Column(name = "issued_at")
    private Timestamp issuedAt;

    @Column(name = "user_point_id")
    private long userPointId;

    @Column(name = "refunded_at")
    private Timestamp refundedAt;

    @Column(name="count")
    private long count;


    @PrePersist
    protected void onCreate(){
        this.issuedAt = new Timestamp(System.currentTimeMillis());
    }

    @PreUpdate
    protected void onUpdate() {
        if (this.status == Status.REFUND && this.refundedAt == null) {
            this.refundedAt = new Timestamp(System.currentTimeMillis());
        }
    }

    public enum Status{
        AVAILABLE,
        USED,
        EXPIRED,
        REFUND
    }
}
