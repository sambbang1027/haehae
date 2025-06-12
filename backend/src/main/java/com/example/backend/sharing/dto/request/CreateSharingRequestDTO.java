package com.example.backend.sharing.dto.request;

import com.example.backend.entity.sharing.SharingPosts;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@NotBlank
public class CreateSharingRequestDTO {
    private Long userId;

    @NotBlank(message = "제목을 입력해주세요.")
    private String title;

    @NotBlank(message = "본문을 입력해주세요.")
    private String description;

    private SharingPosts.Status status;
    private SharingPosts.Category category;
    private List<String> imgUrl;
    private String regionCode;
}
