package com.example.backend.sharing.dto.response;


import com.example.backend.entity.sharing.SharingPosts;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class SharingCotentResponseDTO {
    private Long userId;
    private Long sharingPostId;
    private String nickname;
    private String profileImgUrl;
    private SharingPosts.Category category;
    private String title;
    private String description;
    private Timestamp createdAt;

    @QueryProjection
    public SharingCotentResponseDTO(Long userId, Long sharingPostId, String nickname, String profileImgUrl, SharingPosts.Category category, String title, String description, Timestamp createdAt) {
        this.userId = userId;
        this.sharingPostId = sharingPostId;
        this.nickname = nickname;
        this.profileImgUrl = profileImgUrl;
        this.category = category;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
    }
}
