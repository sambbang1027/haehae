package com.example.backend.entity.reward;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Table(name = "reward_items")
public class RewardItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reward_item_id")
    private Long rewardItemId;

    private String name;
    private String description;

    @Column(name = "point_cost")
    private Long pointCost;
    private Long stock;

    @Enumerated(EnumType.STRING)
    @Column(name = "reward_type", nullable = false)
    private RewardType rewardType;

    public enum RewardType {
        DONATION,
        VOUCHER,
        GIFTICON
    }
}

