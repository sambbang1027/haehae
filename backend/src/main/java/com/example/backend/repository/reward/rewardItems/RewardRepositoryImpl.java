package com.example.backend.repository.reward.rewardItems;


import com.example.backend.dto.reward.rewardItems.response.FindRewardDetailDTO;
import com.example.backend.dto.reward.rewardItems.response.FindRewardListDTO;
import com.example.backend.dto.reward.rewardItems.response.QFindRewardDetailDTO;
import com.example.backend.dto.reward.rewardItems.response.QFindRewardListDTO;
import com.example.backend.entity.reward.QRewardItemImages;
import com.example.backend.entity.reward.QRewardItems;
import com.example.backend.entity.reward.RewardItems;
import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RewardRepositoryImpl implements RewardRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    public RewardRepositoryImpl(JPAQueryFactory queryFactory) {
        this.jpaQueryFactory = queryFactory;
    }

    QRewardItems ri = QRewardItems.rewardItems;
    QRewardItemImages qri = QRewardItemImages.rewardItemImages;
    QRewardItemImages subQri = new QRewardItemImages("subQri");

    @Override
    public List<FindRewardListDTO> findRewardList(RewardItems.RewardType rewardType) {
        return jpaQueryFactory
                .select(new QFindRewardListDTO(
                        ri.id,
                        ri.name,
                        ri.pointCost,
                        ExpressionUtils.as(
                                JPAExpressions
                                        .select(subQri.rewardItemsImgUrl.min()) // 또는 max()
                                        .from(subQri)
                                        .where(subQri.rewardItemId.eq(ri.id)),
                                "rewardItemsImgUrl"
                            )
                        ))
                .from(ri)
//                .leftJoin(qri)
//                .on(qri.rewardItemId.eq(ri.id))
                .where(
                        rewardType !=null ? ri.rewardType.eq(rewardType) : null,
                        ri.stock.gt(0)
                )
                .fetch();
    }

    @Override
    public FindRewardDetailDTO findRewardDetailById(long id) {
        return jpaQueryFactory
                .from(ri)
                .leftJoin(qri).on(qri.rewardItemId.eq(ri.id))// 연관 매핑이 없으니 FK로 직접 조인
                .where(ri.id.eq(id))
                .transform(GroupBy.groupBy(ri.id).as(
                        new QFindRewardDetailDTO(
                                ri.id,
                                ri.name,
                                ri.description,
                                ri.pointCost,
                                ri.createdAt,
                                ri.updatedAt,
                                GroupBy.list(qri.rewardItemsImgUrl) // 이미지 여러 개 리스트로
                        )
                ))
                .get(id); // ri.id 기준으로 단건 꺼냄
    }
}
