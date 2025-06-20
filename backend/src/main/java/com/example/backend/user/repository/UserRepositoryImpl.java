package com.example.backend.user.repository;

import com.example.backend.entity.user.QUser;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public String getRegionCodeById(String username) {
        QUser u = QUser.user;

        return queryFactory
                .select(u.bcode)
                .from(u)
                .where(u.email.eq(username))
                .fetchOne();
    }

}
