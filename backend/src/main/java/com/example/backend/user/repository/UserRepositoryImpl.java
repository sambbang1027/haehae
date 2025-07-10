package com.example.backend.user.repository;

import com.example.backend.entity.user.QUser;
import com.example.backend.entity.user.QUserLevel;
import com.example.backend.user.dto.QTotalAndLevelDTO;
import com.example.backend.user.dto.TotalAndLevelDTO;
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
    
    
    // 미션을 보여줄 사용자의 현재 포인트, 총포인트, 유저 등급
    @Override
    public TotalAndLevelDTO findUserLevelAndPoint(Long userId) {
        QUser u = QUser.user;
        QUserLevel ul = QUserLevel.userLevel;
        return queryFactory
                .select(new QTotalAndLevelDTO(
                        u.totalPoint,
                        u.userLevelId,
                        ul.levelName
                ))
                .from(u)
                .join(ul)
                .on(u.userLevelId.eq(ul.id))
                .where(u.id.eq(userId))
                .fetchOne();
    }
}
