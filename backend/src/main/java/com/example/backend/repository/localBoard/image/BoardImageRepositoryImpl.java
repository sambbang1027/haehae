package com.example.backend.repository.localBoard.image;

import com.example.backend.dto.localBoard.board.response.ImageResponseDTO;
import com.example.backend.dto.localBoard.board.response.QImageResponseDTO;
import com.example.backend.entity.localBoard.QLocalBoardImages;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.List;

public class BoardImageRepositoryImpl implements BoardImageRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BoardImageRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    //LocalBoardId로 지역게시물 이미지 가져오기
    @Override
    public List<ImageResponseDTO> getLocalBoardDetailImageById(long localBoardId){
        QLocalBoardImages lbi = QLocalBoardImages.localBoardImages;

        return queryFactory
                .select( new QImageResponseDTO(
                        lbi.localBoardImageId,
                        lbi.localBoardId,
                        lbi.localBoardImgUrl
                ))
                .from(lbi)
                .where(lbi.localBoardId.eq(localBoardId))
                .fetch();
    }
}
