package com.example.backend.userLevel.repsoitory;

import com.example.backend.entity.user.QUser;
import com.example.backend.entity.user.QUserLevel;
import com.example.backend.entity.user.User;
import com.example.backend.userLevel.dto.UserLevel;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;


@RequiredArgsConstructor
public class UserLevelRepositoryImpl implements UserLevelRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    // 유저 등급 조회 (등급 페이지)
    @Override
    public UserLevel getUserLevelInfo (Long userId){
        QUser user = QUser.user;
        QUserLevel level = QUserLevel.userLevel;

        return queryFactory
                .select(Projections.constructor(UserLevel.class,
                        user.nickname,
                        level.levelName,
                        user.levelAchievedAt,
                        user.levelExpireAt))
                .from(user)
                .join(level).on(user.userLevelId.eq(level.id))
                .where(user.id.eq(userId))
                .fetchOne();

    }

    // 유저 등급 산정
    @Override
    public Long resetUserLevel (Long point){
        QUserLevel level = QUserLevel.userLevel;

        return queryFactory
                .select(level.id)
                .from(level)
                .where(level.minPoints.loe(point)) // 최소 포인트보다 작은 레벨들 뽑아서
                .orderBy(level.minPoints.desc())  // 높은 순으로 정렬한 다음
                .limit(1)  // 그 중 가장 높은 등급을 선택
                .fetchOne();
    }

}
