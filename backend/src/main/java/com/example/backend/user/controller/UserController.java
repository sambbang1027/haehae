package com.example.backend.user.controller;

import com.example.backend.common.response.HaehaeResponse;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.user.dto.*;
import com.example.backend.user.service.CommonUserService;
import com.example.backend.user.service.LocalUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final LocalUserService localUserService;
    private final CommonUserService commonUserService;

    // 로컬 회원가입
    @PostMapping("/register/local")
    public ResponseEntity<HaehaeResponse<Void>>localRegister(@RequestBody LocalRegisterDTO localRegisterDTO){
        localUserService.localRegister(localRegisterDTO);

        return ResponseEntity.ok(HaehaeResponse.ok());
    }

    // 닉넴 중복 확인
    @GetMapping("/register/check/nickname")
    public ResponseEntity<HaehaeResponse<Boolean>> duplicateNickname(@RequestParam String nickname){
        return ResponseEntity.ok(HaehaeResponse.ok(localUserService.duplicateNickname(nickname)));
    }


    // 아이디 찾기
    @PostMapping("/find/id")
    public ResponseEntity<HaehaeResponse<String>> findUserId(@RequestBody FindIdRequest findIdRequest){
        return ResponseEntity.ok(HaehaeResponse.ok(localUserService.findEmailByNmaeAndPhoneNum(findIdRequest)));
    }

    // 비밀번호 재설정
    @PostMapping("/reset/pw")
    public ResponseEntity<HaehaeResponse<Void>> resetPwd(@RequestBody FindPwRequest findPwRequest){
        localUserService.resetPassword(findPwRequest.getToken(), findPwRequest.getNewPwd());
        return ResponseEntity.ok(HaehaeResponse.ok());
    }

    // 셋팅 페이지 유저 정보
    @GetMapping("/setting/info")
    public ResponseEntity<HaehaeResponse<UserSettingResponse>> settingInfo(@RequestParam Long userId){
        UserSettingResponse response = commonUserService.getSettingUserInfo(userId);
        return ResponseEntity.ok(HaehaeResponse.ok(response));
    }

    // 회원 정보 수정을 위한 정보 조회
    @GetMapping("/get/edit/info")
    public ResponseEntity<HaehaeResponse<UserEditInfoResponse>> getEditInfo(@RequestParam Long userId){
        UserEditInfoResponse response = commonUserService.getEditUserInfo(userId);
        return ResponseEntity.ok(HaehaeResponse.ok(response));
    }

    // 회원 정보 수정
    @PostMapping("/edit/info")
    public ResponseEntity<HaehaeResponse<Void>> updateUserInfo (@RequestBody UserEditInfoRequest userEditInfoRequest){
        commonUserService.updateUserInfo(userEditInfoRequest);
        return ResponseEntity.ok(HaehaeResponse.ok());
    }

    // 회원 탈퇴 -> 상태 변경 INACTIVE
    @PostMapping("/delete")
    public ResponseEntity<HaehaeResponse<Void>> deleteUser(@RequestBody DeleteUserRequest deleteUserRequest){
        commonUserService.deleteUserAccount(deleteUserRequest);
        return ResponseEntity.ok(HaehaeResponse.ok());
    }

    // 프로필 수정
    @PostMapping("/edit/profile")
    public ResponseEntity<HaehaeResponse<Void>> updateProfile(@RequestBody ProfileRequest profileRequest){
        System.out.println("nickname new !! "+ profileRequest.getNickname() );
        commonUserService.updateProfile(profileRequest);
        return ResponseEntity.ok(HaehaeResponse.ok());
    }

    // 로그인 상태에서 비밀번호 변경
    @PostMapping("/edit/userPw/reset")
    public ResponseEntity<HaehaeResponse<Void>> updateResetPw(@RequestBody ResetUserPwRequest resetUserPwRequest
                                                   , @AuthenticationPrincipal CustomUserDetails userDetails){
        localUserService.localUserResetPassword(resetUserPwRequest, userDetails);
        return ResponseEntity.ok(HaehaeResponse.ok());
    }

    @GetMapping("/get/mypage/info")
    public ResponseEntity<HaehaeResponse<MyPageInfo>> getMypageInfo(@AuthenticationPrincipal CustomUserDetails userDetails){
        MyPageInfo response = commonUserService.getMyPageInfo(userDetails.getId());

        return ResponseEntity.ok(HaehaeResponse.ok(response));
    }
}
