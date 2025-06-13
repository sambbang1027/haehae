package com.example.backend.sharing.repository;

import com.example.backend.entity.user.QUser;
import com.example.backend.entity.sharing.QSharingPosts;
import com.example.backend.sharing.dto.request.SharingStatusRequestDTO;
import com.example.backend.sharing.dto.request.UpdateSharingRequestDTO;
import com.example.backend.sharing.dto.response.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class SharingRepositoryImpl implements SharingRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public SharingRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    //regionCode로 나눔 게시물 반환하기
    @Override
    public List<SharingListReponseDTO> getSharingList(String regionCode){
        QSharingPosts sp = QSharingPosts.sharingPosts;
        QUser u = QUser.user;

        return queryFactory
                .select(new QSharingListReponseDTO(
                        sp.sharingPostId,
                        sp.title,
                        sp.status,
                        u.id,
                        u.nickname,
                        u.profileImageUrl
                ))
                .from(sp)
                .join(u)
                .on(sp.userId.eq(u.id))
                .where(sp.regionCode.eq(regionCode))
                .fetch();
    };

    //나눔 게시물 내용 업데이트
    @Override
    @Transactional
    public void updateSharingDetail(UpdateSharingRequestDTO updateSharingRequestDTO){
        QSharingPosts sp = QSharingPosts.sharingPosts;

        JPAUpdateClause update = queryFactory.update(sp);

        update.set(sp.title, updateSharingRequestDTO.getTitle());
//        update.set(sp.status, updateSharingRequestDTO.getStatus());
        update.set(sp.description, updateSharingRequestDTO.getDescription());

        update.where(
                sp.sharingPostId.eq(updateSharingRequestDTO.getSharingPostId())
                        .and(sp.userId.eq(updateSharingRequestDTO.getUserId()))
                )
                .execute();
    };

    //나눔 게시물 상태 업데이트
    @Override
    @Transactional
    public void updateSharingStatus(SharingStatusRequestDTO sharingStatusRequestDTO){
        QSharingPosts sp = QSharingPosts.sharingPosts;

        queryFactory
                .update(sp)
                .set(sp.status, sharingStatusRequestDTO.getStatus())
                .where(sp.userId.eq(sharingStatusRequestDTO.getUserId())
                        .and(sp.sharingPostId.eq(sharingStatusRequestDTO.getSharingPostId())))
                .execute();
    }

    //나눔 게시물 상세정보불러오기
    @Override
    public SharingDetailResponseDTO getSharingDetail(Long sharingPostId){
        QSharingPosts sp = QSharingPosts.sharingPosts;
        QUser u = QUser.user;

        return queryFactory
                .select(new QSharingDetailResponseDTO(
                        u.id,
                        sp.sharingPostId,
                        u.nickname,
                        sp.title,
                        sp.description
                ))
                .from(sp)
                .join(u)
                .on(sp.userId.eq(u.id))
                .where(sp.sharingPostId.eq(sharingPostId))
                .fetchOne();
    }
}
