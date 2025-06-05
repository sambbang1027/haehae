package com.example.backend.localBoard.board.dto.response;


import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class ImageResponseDTO {
    private long localBoardImageId;
    private long localBoardId;
    private String localBoardImgUrl;

    @QueryProjection
    public ImageResponseDTO(long localBoardImageId, long localBoardId, String localBoardImgUrl) {
        this.localBoardImageId = localBoardImageId;
        this.localBoardId = localBoardId;
        this.localBoardImgUrl = localBoardImgUrl;
    }
}
