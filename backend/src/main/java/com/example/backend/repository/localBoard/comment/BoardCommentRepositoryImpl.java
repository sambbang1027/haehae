package com.example.backend.repository.localBoard.comment;

import com.example.backend.dto.localBoard.comment.response.CommentResponseDTO;
import com.example.backend.dto.localBoard.comment.response.QCommentResponseDTO;
import com.example.backend.entity.localBoard.QComments;
import com.example.backend.entity.user.QUsers;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BoardCommentRepositoryImpl implements BoardCommentRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public BoardCommentRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    // LocalBoardId로 지역게시물 댓글 가져오기
    @Override
    public List<CommentResponseDTO> getLocalBoardDetailCommentById(long localBoardId){
        QComments cm = QComments.comments;
        QUsers u = QUsers.users;

        List<CommentResponseDTO> flatComments = queryFactory
                .select(new QCommentResponseDTO(
                        u.userId,
                        u.nickname,
                        u.profileImageUrl,
                        cm.id,
                        cm.parentCommentId,
                        cm.content,
                        cm.createdAt
                ))
                .from(cm)
                .join(u).on(cm.userId.eq(u.userId))
                .where(cm.localBoardId.eq(localBoardId))
                .fetch();
        return flatComments;
    }
}
