package com.example.backend.userPoint.repository;

import com.example.backend.entity.reward.QRewardItemImages;
import com.example.backend.entity.reward.QRewardItems;
import com.example.backend.entity.reward.QUserRewards;
import com.example.backend.entity.user.QUserPoint;
import com.example.backend.userPoint.dto.response.PaymentResponseDTO;
import com.example.backend.userPoint.dto.response.QPaymentResponseDTO;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

@Repository
public class UserPointRepositoryImpl implements UserPointRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    public UserPointRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    QRewardItems ri = QRewardItems.rewardItems;
    QRewardItemImages qri = QRewardItemImages.rewardItemImages;
    QUserRewards ur = QUserRewards.userRewards;
    QUserPoint up = QUserPoint.userPoint;
    QRewardItemImages subQri = new QRewardItemImages("subQri");


    @Override
    public PaymentResponseDTO payResponse(long userPointId) {
        return jpaQueryFactory
                .select(new QPaymentResponseDTO(
                        up.id,
                        up.amount,
                        up.createdAt,
                        ri.name,
                        ExpressionUtils.as(
                                JPAExpressions
                                        .select(subQri.rewardItemsImgUrl.min()) // 또는 max()
                                        .from(subQri)
                                        .where(subQri.rewardItemId.eq(ri.id)),
                                "rewardItemsImgUrl"
                        )
                )).from(up)
                .join(ur).on(up.id.eq(ur.userPointId))
                .join(ri).on(ur.rewardItemId.eq(ri.id))
                .where(
                        up.id.eq(userPointId)
                ).fetchOne();
    }
}
