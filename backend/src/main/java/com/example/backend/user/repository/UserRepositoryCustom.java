package com.example.backend.user.repository;

import com.example.backend.user.dto.MyPageInfo;

public interface UserRepositoryCustom {
    String getRegionCodeById(String username);
    Long updateUserInfo(Long userId, String address, String bcode,
                        String residenceType, String phoneNumber);

    Long deleteAccount(Long userId);
    Long updateProfile(Long userId, String nickname, String profileImageUrl);

    MyPageInfo getMypageInfo(Long userId);
}
