package com.example.backend.localBoard.board.repository;

import com.example.backend.localBoard.board.dto.request.UpdateContentRequestDTO;
import com.example.backend.localBoard.board.dto.response.BoardListResponseDTO;
import com.example.backend.localBoard.board.dto.response.ContentResponseDTO;
import com.example.backend.localBoard.board.dto.response.QBoardListResponseDTO;
import com.example.backend.localBoard.board.dto.response.QContentResponseDTO;
import com.example.backend.entity.QUser;
import com.example.backend.entity.localBoard.QComments;
import com.example.backend.entity.localBoard.QLocalBoards;
import com.example.backend.localBoard.board.dto.response.QBoardListResponseDTO;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class LocalBoardRepositoryImpl implements LocalBoardRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public LocalBoardRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    //지역코드 가져오기 -> user 테이블
    @Override
    public String getRegionCodeById(long userId) {
        QUser u = QUser.user;

        return queryFactory
                .select(u.address)
                .from(u)
                .where(u.id.eq(userId))
                .fetchOne();
    }

    //지역코드로 게시물 리스트 불러오기
    @Override
    public List<BoardListResponseDTO> getLocalBoardListByRegion(String regionCode) {
        QLocalBoards lb = QLocalBoards.localBoards;
        QComments cm = QComments.comments;
        QUser u = QUser.user;

        return queryFactory
                .select(new QBoardListResponseDTO(
                        lb.localBoardId,
                        lb.title,
                        lb.content,
                        u.nickname,
                        lb.createdAt,
                        cm.count()
                ))
                .from(lb)
                .join(u).on(lb.userId.eq(u.id))
                .leftJoin(cm).on(lb.localBoardId.eq(cm.localBoardId))
                .where(lb.regionCode.eq(regionCode))
                .groupBy(lb.localBoardId, lb.title, lb.content, u.nickname, lb.createdAt)
                .orderBy(lb.createdAt.desc())
                .fetch();
    }


    //지역 게시물 리스트 사용자 닉네임 및 게시물 제목으로 리스트 불러오기
    @Override
    public List<BoardListResponseDTO> searchLocalBoardListByNicknameOrTitle(String regionCode, String searchContent){
        QLocalBoards lb = QLocalBoards.localBoards;
        QComments cm = QComments.comments;
        QUser u = QUser.user;

        return queryFactory
                .select(new QBoardListResponseDTO(
                        lb.localBoardId,
                        lb.title,
                        lb.content,
                        u.nickname,
                        lb.createdAt,
                        cm.count()
                ))
                .from(lb)
                .join(u).on(lb.userId.eq(u.id))
                .leftJoin(cm).on(lb.localBoardId.eq(cm.localBoardId))
                .where(lb.regionCode.eq(regionCode)
                        .and((lb.title.contains(searchContent))
                        .or(u.nickname.contains(searchContent))
                        )
                ).
                groupBy(lb.localBoardId, lb.title, lb.content, u.nickname, lb.createdAt)
                .orderBy(lb.createdAt.desc())
        .fetch();
    }

    //LocalBoardId로 지역게시물 세부 페이지 데이터 불러오기
    @Override
    public ContentResponseDTO getLocalBoardDetailById(long localBoardId){
        QLocalBoards lb = QLocalBoards.localBoards;
        QUser u = QUser.user;

        return queryFactory
                .select(new QContentResponseDTO(
                        u.id,
                        u.nickname,
                        lb.localBoardId,
                        lb.title,
                        lb.content,
                        lb.createdAt
                ))
                .from(lb)
                .join(u).on(lb.userId.eq(u.id))
                .where(lb.localBoardId.eq(localBoardId))
                .fetchOne();
    };

    @Transactional
    @Override
    public void updateDetailContent (long localBoardId, UpdateContentRequestDTO updateContentRequestDTO){
        QLocalBoards lb = QLocalBoards.localBoards;

//            queryFactory
//                .update(lb)
//                .set(lb.title, updateContentRequestDTO.getTitle())
//                .set(lb.content, updateContentRequestDTO.getContent())
//                .set(lb.updatedAt, updateContentRequestDTO.getUpdateAt())
//                .where(lb.localBoardId.eq(localBoardId))
//                .execute();
        JPAUpdateClause update = queryFactory.update(lb);

        if (updateContentRequestDTO.getTitle() != null) {
            update.set(lb.title, updateContentRequestDTO.getTitle());
        }

        if (updateContentRequestDTO.getContent() != null) {
            update.set(lb.content, updateContentRequestDTO.getContent());
        }

        if (updateContentRequestDTO.getUpdateAt() != null) {
            update.set(lb.updatedAt, updateContentRequestDTO.getUpdateAt());
        }

        update.where(lb.localBoardId.eq(localBoardId)).execute();
    }
}
