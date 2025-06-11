package com.example.backend.sharing.dto.request;

import com.example.backend.entity.sharing.SharingPosts;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@NotBlank
@NotNull
public class UpdateSharingRequestDTO {
//    @NotNull
    private Long userId;
//    @NotNull
    private Long sharingPostId;
//    @NotBlank(message = "제목을 입력해주세요.")
    private String title;
//    @NotBlank(message = "본문을 입력해주세요.")
    private String description;
    private SharingPosts.Status status;
    private SharingPosts.Category category;
}
