package com.example.backend.localBoard.image.repository;

import com.example.backend.localBoard.board.dto.response.ImageResponseDTO;
import com.example.backend.localBoard.board.dto.response.QImageResponseDTO;
import com.example.backend.entity.localBoard.QLocalBoardImages;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public class BoardImageRepositoryImpl implements BoardImageRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BoardImageRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    //LocalBoardId로 지역게시물 이미지 가져오기
    @Override
    public List<ImageResponseDTO> getDetailImageListById(long localBoardId){
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

    @Transactional
    @Override
    public void deleteDetailImage(long localBoardId, List<String> boardImageUrls){
        QLocalBoardImages lbi = QLocalBoardImages.localBoardImages;

        queryFactory
                .delete(lbi)
                .where(
                        lbi.localBoardId.eq(localBoardId)
                                .and(lbi.localBoardImgUrl.in(boardImageUrls))
                )
                .execute();
    };
}
