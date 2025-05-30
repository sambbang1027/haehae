package com.example.backend.repository.localBoard;

import com.example.backend.dto.localBoard.LocalBoardListDTO;
import com.example.backend.dto.localBoard.QLocalBoardListDTO;
import com.example.backend.entity.localBoard.QComments;
import com.example.backend.entity.localBoard.QLocalBoards;
import com.example.backend.entity.user.QUsers;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LocalBoardRepositoryImpl implements LocalBoardRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public LocalBoardRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<LocalBoardListDTO> getLocalBoardListByRegion(String regionCode) {
        QLocalBoards lb = QLocalBoards.localBoards;
        QComments cm = QComments.comments;
        QUsers u = QUsers.users;

        return queryFactory
                .select(new QLocalBoardListDTO(
                        lb.title,
                        lb.content,
                        u.nickname,
                        lb.createdAt,
                        cm.count()
                ))
                .from(lb)
                .join(u).on(lb.userId.eq(u.userId))
                .leftJoin(cm).on(lb.localBoardId.eq(cm.localBoardId))
                .where(lb.regionCode.eq(regionCode))
                .groupBy(lb.localBoardId, lb.title, lb.content, u.nickname, lb.createdAt)
                .orderBy(lb.createdAt.desc())
                .fetch();
    }
}
