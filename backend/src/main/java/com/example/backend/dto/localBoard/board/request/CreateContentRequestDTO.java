package com.example.backend.dto.localBoard.board.request;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class CreateContentRequestDTO {
    long userId;
    String regionCode;
    String title;
    String content;
    List<String> localBoardImageUrl;

    @QueryProjection
    public CreateContentRequestDTO(long userId, String regionCode, String title, String content) {
        this.userId = userId;
        this.regionCode = regionCode;
        this.title = title;
        this.content = content;
    }
}
