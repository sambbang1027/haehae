package com.example.backend.userPoint.repository;

import com.example.backend.entity.reward.QRewardItemImages;
import com.example.backend.entity.reward.QRewardItems;
import com.example.backend.entity.reward.QUserRewards;
import com.example.backend.entity.user.QUserPoint;
import com.example.backend.userPoint.dto.response.PaymentResponseDTO;
import com.example.backend.userPoint.dto.response.QPaymentResponseDTO;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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

    // 유저의 6개월간 누적 포인트 조회
//    @Override
//    public Long getUserPointFor6month(Long userId){
//        QUserPoint point = QUserPoint.userPoint;
//
//        return jpaQueryFactory
//                .select(point.amount.sum())
//                .from(point)
//                .where(point.userId.eq(userId)
//                    , point.createdAt.goe(Timestamp.valueOf(LocalDateTime.now().minusMonths(6))))
//                .fetchOne();
//    }

    @Override
   public Map<Long , Long> getUserPointFor6month(List<Long> userIds){
        QUserPoint userPoint = QUserPoint.userPoint;

        // 만료 유저들의 최근 6개월 포인트 합산
       List<Tuple> allUserPoint = jpaQueryFactory
               .select(userPoint.userId, userPoint.amount.sum())
               .from(userPoint)
               .where(
                       userPoint.userId.in(userIds),
                       userPoint.createdAt.goe(Timestamp.valueOf(LocalDateTime.now().minusMonths(6))),
                       userPoint.pointType.eq("적립")
               )
               .groupBy(userPoint.userId)
               .fetch();

       // key - value로 유저 아이디- 누적포인트
       return allUserPoint.stream().collect(Collectors.toMap(
               tuple -> tuple.get(userPoint.userId),
               tuple -> Optional.ofNullable(tuple.get(userPoint.amount.sum())).orElse(0L)
       ));
    }
}
