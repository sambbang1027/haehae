package com.example.backend.entity.reward;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "reward_item_images")
public class RewardItemImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reward_item_image_id")
    private long id;

    @Column(name = "reward_item_id")
    private long rewardItemId;

    @Column(name = "reward_items_img_url", length = 1024)
    private String rewardItemsImgUrl;

}
