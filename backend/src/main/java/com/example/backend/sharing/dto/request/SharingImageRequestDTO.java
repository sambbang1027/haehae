package com.example.backend.sharing.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class SharingImageRequestDTO {
    private List<Long> sharingImageId;
    private Long sharingPostId;
    private List<String> imgUrl;

    public SharingImageRequestDTO(List<Long> sharingImageId, Long sharingPostId, List<String> imgUrl) {
        this.sharingImageId = sharingImageId;
        this.sharingPostId = sharingPostId;
        this.imgUrl = imgUrl;
    }
}
