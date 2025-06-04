package com.example.backend.repository.localBoard.board;

import com.example.backend.dto.localBoard.board.response.BoardListResponseDTO;
import com.example.backend.dto.localBoard.board.response.ContentResponseDTO;
import com.example.backend.dto.localBoard.board.response.QBoardListResponseDTO;
import com.example.backend.dto.localBoard.board.response.QContentResponseDTO;
import com.example.backend.entity.QUser;
import com.example.backend.entity.localBoard.QComments;
import com.example.backend.entity.localBoard.QLocalBoards;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

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
}
