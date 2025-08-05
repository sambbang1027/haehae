package com.example.backend.user.repository;

import com.example.backend.entity.user.QUser;
import com.example.backend.entity.user.QUserLevel;
import com.example.backend.entity.user.User;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.user.dto.LocalRegisterDTO;
import com.example.backend.user.dto.MyPageInfo;
import com.example.backend.user.vo.Address;
import com.example.backend.user.vo.Email;
import com.example.backend.user.vo.Nickname;
import com.example.backend.user.vo.PhoneNumber;
import com.querydsl.core.types.Projections;
import com.example.backend.user.dto.QTotalAndLevelDTO;
import com.example.backend.user.dto.TotalAndLevelDTO;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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

    // 유저 정보 수정
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

    // 탈퇴
    @Override
    public Long deleteAccount (Long userId){
        QUser user = QUser.user;

        return queryFactory
                .update(user)
                .set(user.status, User.Status.INACTIVE)
                .where(user.id.eq(userId))
                .execute();
    }

    // 프로필 업데이트
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

    // 마이페이지에 출력할 정보
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

    // 영구정지
    @Override
    public void permanentStop(Long userId, User.Status status) {
        QUser u = QUser.user;
         queryFactory
                .update(u)
                .set(u.status, status)
                .where(u.id.eq(userId))
                .execute();
    }

    // 탈퇴 했던 유저 정보 리셋 후 재가입
    @Override
    public Long updateReActiveUser(LocalRegisterDTO localRegisterDTO, String passwordHash
            , Email email, Nickname nickname, PhoneNumber phoneNumber, Address address){
        QUser user = QUser.user;
        return queryFactory
                .update(user)
                .set(user.userLevelId, 1L)
                .set(user.levelAchievedAt, LocalDate.now())
                .set(user.levelExpireAt, LocalDate.now().plusMonths(3))
                .set(user.email, email.getValue())
                .set(user.name, localRegisterDTO.getName())
                .set(user.passwordHash, passwordHash)
                .set(user.nickname, nickname.getValue())
                .set(user.profileImageUrl, (String) null)
                .set(user.socialProvider, (String) null)
                .set(user.phoneNumber, phoneNumber.getValue())
                .set(user.birth, localRegisterDTO.getBirth())
                .set(user.address, address.getRoadAddress())
                .set(user.bcode, address.getBcode())
                .set(user.createdAt, Timestamp.valueOf(LocalDateTime.now()))
                .set(user.residenceType, localRegisterDTO.getResidenceType())
                .set(user.deletedAt, (Timestamp) null)
                .set(user.status, User.Status.ACTIVE)
                .set(user.currentPoint, (Long) null)
                .set(user.totalPoint, (Long) null)
                .where(user.email.eq(email.getValue()))
                .execute();

    }

    // 등급 만료 회원 조회
    @Override
    public List<Long> todayLevelExpired(LocalDate today){
        QUser user = QUser.user;
        return queryFactory
                .select(user.id)
                .from(user)
                .where(user.levelExpireAt.eq(today))
                .fetch();
    }

    // 등급 재산정 - 업데이트
    @Override
    public Long bulkUpdateUserLevel(Long levelId, List<Long> userIds, LocalDate achievedAt, LocalDate expireAt) {
        QUser user = QUser.user;

        return queryFactory
                .update(user)
                .set(user.userLevelId, levelId)
                .set(user.levelAchievedAt, achievedAt)
                .set(user.levelExpireAt, expireAt)
                .where(user.id.in(userIds))
                .execute();
    }

}
