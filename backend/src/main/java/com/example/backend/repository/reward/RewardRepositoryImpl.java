package com.example.backend.repository.reward;

import com.example.backend.dto.reward.FindRewardDetailDTO;
import com.example.backend.dto.reward.FindRewardListDTO;
import com.example.backend.dto.reward.QFindRewardDetailDTO;
import com.example.backend.dto.reward.QFindRewardListDTO;
import com.example.backend.entity.reward.QRewardItemImages;
import com.example.backend.entity.reward.QRewardItems;
import com.example.backend.entity.reward.RewardItems;
import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

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

    @Override
    public FindRewardDetailDTO findRewardDetailById(long id) {
        return jpaQueryFactory
                .from(ri)
                .leftJoin(qri).on(qri.rewardItem.eq(ri.id))// 연관 매핑이 없으니 FK로 직접 조인
                .where(ri.id.eq(id))
                .transform(GroupBy.groupBy(ri.id).as(
                        new QFindRewardDetailDTO(
                                ri.id,
                                ri.name,
                                ri.description,
                                ri.pointCost,
                                ri.createdAt,
                                GroupBy.list(qri.rewardItemsImgUrl) // 이미지 여러 개 리스트로
                        )
                ))
                .get(id); // ri.id 기준으로 단건 꺼냄
    }
}
