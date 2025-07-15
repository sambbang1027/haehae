package com.example.backend.user.repository;

import com.example.backend.entity.user.QUser;
import com.example.backend.entity.user.QUserLevel;
import com.example.backend.entity.user.User;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.user.dto.MyPageInfo;
import com.querydsl.core.types.Projections;
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

    @Override
    public Long updateUserInfo(Long userId, String address, String bcode,
                               String residenceType, String phoneNumber ){
        QUser user = QUser.user;

        User.ResidenceType type;

        try{
            // 제대로 된 주거타입이 넘어왔는지 확인
            type = User.ResidenceType.valueOf(residenceType);
        }catch (IllegalArgumentException e){
            throw new HaehaeException(ErrorCode.INVALID_RESIDENCE_TYPE);
        }

            return queryFactory
                    .update(user)
                    .set(user.phoneNumber, phoneNumber)
                    .set(user.address, address)
                    .set(user.bcode, bcode)
                    .set(user.residenceType, type)
                    .where(user.id.eq(userId))
                    .execute();
    }

    @Override
    public Long deleteAccount (Long userId){
        QUser user = QUser.user;

        return queryFactory
                .update(user)
                .set(user.status, User.Status.INACTIVE)
                .where(user.id.eq(userId))
                .execute();
    }

    @Override
    public Long updateProfile(Long userId, String nickname, String profileImageUrl) {
        QUser user  = QUser.user;

        var update = queryFactory
                .update(user)
                .set(user.nickname, nickname)
                .where(user.id.eq(userId));

        if (profileImageUrl != null && !profileImageUrl.isEmpty()) {
            update.set(user.profileImageUrl, profileImageUrl);
        }

        return update.execute();
    }

    @Override
    public MyPageInfo getMypageInfo(Long userId){
        QUser user = QUser.user;
        QUserLevel level = QUserLevel.userLevel;

        return queryFactory
                .select(Projections.constructor(MyPageInfo.class,
                        user.currentPoint,
                        level.levelName
                ))
                .from(user)
                .join(level).on(user.userLevelId.eq(level.id))
                .where(user.id.eq(userId))
                .fetchOne();
    }
}
