package com.example.backend.repository.reward;

import com.example.backend.dto.reward.QUserRewardRecodeDTO;
import com.example.backend.dto.reward.UserRewardRecodeDTO;
import com.example.backend.entity.reward.QRewardItemImages;
import com.example.backend.entity.reward.QRewardItems;
import com.example.backend.entity.reward.QUserRewards;
import com.querydsl.jpa.impl.JPAQueryFactory;

public class UserRewardRepositoryImpl implements UserRewardRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    public UserRewardRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }
    QUserRewards ur = QUserRewards.userRewards;
    QRewardItems ri = QRewardItems.rewardItems;
    QRewardItemImages qri = QRewardItemImages.rewardItemImages;

    @Override
    public UserRewardRecodeDTO findUserRewardById(long id) {
        return jpaQueryFactory
                .select(new QUserRewardRecodeDTO(
                        ur.id,
                        ur.userId,
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

}
