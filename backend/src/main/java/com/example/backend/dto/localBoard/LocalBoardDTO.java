package com.example.backend.dto.localBoard;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocalBoardDTO {
    private Long localBoardId;
    private Long userId;
    private String nickname;
    private String title;
    private String content;
    private String regionCode;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private List<String> imageUrls;
}
