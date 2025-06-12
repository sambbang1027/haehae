package com.example.backend.sharing.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class SharingImageResponseDTO {
    private Long sharingImageId;
    private Long sharingPostId;
    private String imgUrl;

    @QueryProjection
    public SharingImageResponseDTO(Long sharingImageId, Long sharingPostId, String imgUrl) {
        this.sharingImageId = sharingImageId;
        this.sharingPostId = sharingPostId;
        this.imgUrl = imgUrl;
    }
}
