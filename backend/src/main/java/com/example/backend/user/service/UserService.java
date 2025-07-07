package com.example.backend.user.service;

import com.example.backend.user.dto.FindIdRequest;
import com.example.backend.user.dto.LocalRegisterDTO;

public interface UserService {

    void localRegister(LocalRegisterDTO localRegisterDTO);
    boolean duplicateNickname (String nickname);
    boolean isEmailDuplicated (String email);
    String findEmailByNmaeAndPhoneNum(FindIdRequest findIdRequest);
    void resetPassword(String token, String newPw);

}
