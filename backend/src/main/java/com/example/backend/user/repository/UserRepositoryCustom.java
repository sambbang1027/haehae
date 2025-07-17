package com.example.backend.user.repository;


import com.example.backend.user.dto.LocalRegisterDTO;
import com.example.backend.user.dto.TotalAndLevelDTO;

import com.example.backend.user.dto.MyPageInfo;
import com.example.backend.user.vo.Address;
import com.example.backend.user.vo.Email;
import com.example.backend.user.vo.Nickname;
import com.example.backend.user.vo.PhoneNumber;

public interface UserRepositoryCustom {
    String getRegionCodeById(String username);
    TotalAndLevelDTO findUserLevelAndPoint(Long userId);
    Long updateUserInfo(Long userId, String address, String bcode,
                        String residenceType, String phoneNumber);

    Long deleteAccount(Long userId);
    Long updateProfile(Long userId, String nickname, String profileImageUrl);

    MyPageInfo getMypageInfo(Long userId);
    Long updateReActiveUser(LocalRegisterDTO localRegisterDTO, String passwordHash
            , Email email, Nickname nickname, PhoneNumber phoneNumber, Address address);
}
