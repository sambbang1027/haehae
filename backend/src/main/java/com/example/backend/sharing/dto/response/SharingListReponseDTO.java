package com.example.backend.sharing.dto.response;

import com.example.backend.entity.sharing.SharingPosts;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SharingListReponseDTO {
    private Long sharingPostId;
    private String title;
    private SharingPosts.Status status;
    private Long userId;
    private String nickname;
    private String profileImageUrl;
    private Timestamp createdAt;

    @QueryProjection
    public SharingListReponseDTO(Long sharingPostId, String title, SharingPosts.Status status, Long userId, String nickname, String profileImageUrl, Timestamp createdAt) {
        this.sharingPostId = sharingPostId;
        this.title = title;
        this.status = status;
        this.userId = userId;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.createdAt = createdAt;
    };
}
