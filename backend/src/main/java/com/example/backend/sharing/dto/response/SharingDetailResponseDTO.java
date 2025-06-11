package com.example.backend.sharing.dto.response;


import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class SharingDetailResponseDTO {
    private Long userId;
    private Long sharingPostId;
    private String nickname;
    private String title;
    private String description;

    @QueryProjection
    public SharingDetailResponseDTO(Long userId, Long sharingPostId, String nickname, String title, String description) {
        this.userId = userId;
        this.sharingPostId = sharingPostId;
        this.nickname = nickname;
        this.title = title;
        this.description = description;
    }
}
