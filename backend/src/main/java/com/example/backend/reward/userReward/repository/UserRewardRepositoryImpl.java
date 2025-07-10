package com.example.backend.reward.userReward.repository;

import com.example.backend.entity.reward.*;
import com.example.backend.entity.user.QUser;
import com.example.backend.entity.user.QUserPoint;
import com.example.backend.reward.userReward.dto.response.QUserRewardRecodeDTO;
import com.example.backend.reward.userReward.dto.response.UserRewardRecodeDTO;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.sql.Timestamp;

public class UserRewardRepositoryImpl implements UserRewardRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    public UserRewardRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }
    QUserRewards ur = QUserRewards.userRewards;
    QRewardItems ri = QRewardItems.rewardItems;
    QRewardItemImages qri = QRewardItemImages.rewardItemImages;
    QUser u = QUser.user;
    QUserPoint up =QUserPoint.userPoint;

    @Override
    public UserRewardRecodeDTO findUserRewardById(long id) {
        return jpaQueryFactory
                .select(new QUserRewardRecodeDTO(
                        ur.id,
                        ur.userPointId,
                        ur.rewardItemId,
                        ri.name,
                        ri.pointCost,
                        ur.issuedAt,
                        qri.rewardItemsImgUrl
                ))
                .from(ur)
                .join(ri)
                .on(ur.rewardItemId.eq(ri.id))
                .join(qri)
                .on(ri.id.eq(qri.rewardItemId))
                .where(ur.id.eq(id))
                .fetchFirst();
    }

    @Override
    public Long countUserReward(long userId, Timestamp startAt, Timestamp endAt, RewardItems.RewardType rewardType) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(up.userId.eq(userId));
        builder.and(ur.issuedAt.between(startAt, endAt));
        builder.and(ur.status.ne(UserRewards.Status.REFUND));

        System.out.println(startAt);
        System.out.println(endAt);
        System.out.println(rewardType);

        if (rewardType != null) {
            builder.and(ri.rewardType.eq(rewardType));
        }
        return jpaQueryFactory
                .select(ur.count())
                .from(ur)
                .join(up)
                .on(ur.userPointId.eq(up.id))
                .join(ri)
                .on(ur.rewardItemId.eq(ri.id))
                .where(builder)
                .fetchOne();
    }
}
