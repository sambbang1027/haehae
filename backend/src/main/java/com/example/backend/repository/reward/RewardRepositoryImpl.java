package com.example.backend.repository.reward;

import com.example.backend.dto.reward.FindRewardListDTO;
import com.example.backend.dto.reward.QFindRewardListDTO;
import com.example.backend.entity.reward.QRewardItemImages;
import com.example.backend.entity.reward.QRewardItems;
import com.example.backend.entity.reward.RewardItems;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.ProjectedPayload;
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
                .select(new QFindRewardListDTO (
                        ri.id,
                        ri.name,
                        ri.pointCost,
                        ExpressionUtils.as(
                                JPAExpressions.select(subQri.rewardItemsImgUrl)
                                        .from(subQri)
                                        .where(subQri.id.eq(ri.id))
                                        .orderBy(subQri.id.asc()) // 어떤 이미지를 가져올지 기준: ID가 가장 작은 이미지
                                        .limit(1), // 한 건만 가져옴
                                "rewardItemsImgUrl" // DTO 필드명과 일치시켜 매핑
                            )
                        ))
                .from(ri)
                .leftJoin(qri)
                .on(qri.id.eq(ri.id))
                .where(
                        rewardType !=null ? ri.rewardType.eq(rewardType) : null,
                        ri.stock.gt(0)
                )
                .fetch();
    }
}
