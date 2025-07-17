package com.example.backend.userLevel.repsoitory;

import com.example.backend.entity.user.QUser;
import com.example.backend.entity.user.QUserLevel;
import com.example.backend.userLevel.dto.UserLevel;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;


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

}
