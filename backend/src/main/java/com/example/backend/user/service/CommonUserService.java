package com.example.backend.user.service;

import com.example.backend.auth.service.AuthService;
import com.example.backend.entity.user.User;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.user.dto.*;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.user.repository.UserRepositoryCustom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
public class CommonUserService {

    private final UserRepository userRepository;
    private final AuthService authService;

    // 셋팅 페이지
    public UserSettingResponse getSettingUserInfo(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(()->new HaehaeException(ErrorCode.USER_NOT_FOUND));

        UserSettingResponse settingResponse = UserSettingResponse.builder()
                .username(user.getName())
                .residenceType(user.getResidenceType().name())
                .build();
        return  settingResponse;
    }

    // 회원정보 수정페이지
    public UserEditInfoResponse getEditUserInfo(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new HaehaeException(ErrorCode.USER_NOT_FOUND));

        UserEditInfoResponse editInfoResponse = UserEditInfoResponse.builder()
                .username(user.getName())
                .phoneNumber(user.getPhoneNumber())
                .birth(user.getBirth())
                .address(user.getAddress())
                .bcode(user.getBcode())
                .residenceType(user.getResidenceType().name())
                .build();

        return editInfoResponse;
    }

    // 회원정보 수정 작업
    @Transactional
    public void updateUserInfo(UserEditInfoRequest userEditInfoRequest){
        Long updateCheck = userRepository.updateUserInfo(userEditInfoRequest.getUserId(),
                userEditInfoRequest.getAddress(), userEditInfoRequest.getBcode(),
                userEditInfoRequest.getResidenceType(), userEditInfoRequest.getPhoneNumber());

            if(updateCheck == 0) {
                throw new HaehaeException(ErrorCode.USER_NOT_FOUND);
            }
    }

    // 회원계정 삭제 -> 상태 변경 Inactive
    @Transactional
    public void deleteUserAccount(DeleteUserRequest deleteUserRequest) {
        User user = userRepository.findById(deleteUserRequest.getUserId())
                        .orElseThrow(() -> new HaehaeException(ErrorCode.USER_NOT_FOUND));
        authService.matchingPassword(deleteUserRequest.getPassword(),user.getPasswordHash());

        Long deleteCheck = userRepository.deleteAccount(deleteUserRequest.getUserId());

        if(deleteCheck == 0){
            throw new HaehaeException(ErrorCode.NO_CONTENT_UPDATED);
        }
        log.info("회원 탈퇴 성공 : " + user.getId());

    }

    // 프로필 수정
    @Transactional
    public void updateProfile(ProfileRequest profileRequest){
        User user = userRepository.findById(profileRequest.getUserId())
                .orElseThrow(() -> new HaehaeException(ErrorCode.USER_NOT_FOUND));

        // 기존 이미지는 유지하고 새로운 이미지 등록일 경우만 저장
        String imageUrl = null;
        if (profileRequest.getProfileImageUrl() != null && !profileRequest.getProfileImageUrl().isEmpty()) {
            imageUrl = profileRequest.getProfileImageUrl().get(0);
        }

        Long updateCheck = userRepository.updateProfile(
                profileRequest.getUserId(),
                profileRequest.getNickname(),
                imageUrl
        );

        if (updateCheck == 0) {
            throw new HaehaeException(ErrorCode.NO_CONTENT_UPDATED);
        }
        log.info("프로필 업데이트 성공 : " + user.getId());

    }

    public MyPageInfo getMyPageInfo(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new HaehaeException(ErrorCode.USER_NOT_FOUND));

        return  userRepository.getMypageInfo(userId);
    }
    
}
