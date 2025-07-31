package com.example.backend.userPoint.repository;

import com.example.backend.entity.reward.QRewardItemImages;
import com.example.backend.entity.reward.QRewardItems;
import com.example.backend.entity.reward.QUserRewards;
import com.example.backend.entity.user.QUser;
import com.example.backend.entity.user.QUserPoint;
import com.example.backend.userPoint.dto.response.PaymentResponseDTO;
import com.example.backend.userPoint.dto.response.QPaymentResponseDTO;
import com.example.backend.userPoint.dto.response.UserPointRecordResponse;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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

    // 사용자 포인트 적립/사용 내역
    @Override
    public Slice<UserPointRecordResponse> getUserPointRecord(Long userId, int filterRange, Pageable pageable){
        QUser user = QUser.user;
        LocalDateTime now = LocalDateTime.now();

         List<UserPointRecordResponse> record = jpaQueryFactory
                .select(Projections.constructor(UserPointRecordResponse.class,up.userId,user.currentPoint,
                        up.pointType, up.amount, up.source, up.createdAt))
                .from(up)
                .join(user).on(up.userId.eq(user.id))
                .where(
                        up.userId.eq(userId),
                        up.createdAt.between(
                                Timestamp.valueOf(now.minusMonths(filterRange).with(LocalTime.MIN)), // 00:00:00
                                Timestamp.valueOf(now.with(LocalTime.MAX))
                        ))
                 .orderBy(up.createdAt.desc())
                 .offset(pageable.getOffset())
                 .limit(pageable.getPageSize()+1) // 다음 페이지 있는지 여부 확인
                 .fetch();

        boolean hasNext = record.size() > pageable.getPageSize();

        if (hasNext){
            record.remove(record.size() -1);
        }
        return new SliceImpl<>(record, pageable, hasNext);
    }
}
