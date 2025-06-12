package com.example.backend.entity.sharing;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "sharing_images")
public class SharingImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sharing_image_id")
    private long sharingImageId;

    @Column(name = "sharing_post_id")
    private long sharingPostId;

    @Column(name = "img_url")
    private String imgUrl;
}
