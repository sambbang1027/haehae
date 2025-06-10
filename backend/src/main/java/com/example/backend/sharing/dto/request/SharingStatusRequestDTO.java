package com.example.backend.sharing.dto.request;

import com.example.backend.entity.sharing.SharingPosts;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SharingStatusRequestDTO {
    private Long sharingPostId;
    private Long userId;
    private SharingPosts.Status status;
}
