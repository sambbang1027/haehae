package com.example.backend.entity.reward;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Table(name = "reward_item_images")
public class RewardItemImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reward_item_image_id")
    private Long rewardItemImageId;

    @Column(name = "reward_item_id")
    private Long rewardItemId;

    @Column(name = "reward_item_img_url", length = 1024)
    private String rewardItemsImgUrl;
}
