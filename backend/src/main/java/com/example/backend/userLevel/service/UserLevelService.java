package com.example.backend.userLevel.service;

import com.example.backend.entity.user.User;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.userLevel.dto.UserLevel;
import com.example.backend.userLevel.repsoitory.UserLevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserLevelService {

    private final UserLevelRepository userLevelRepository;
    private final UserRepository userRepository;


    public UserLevel getUserLevelInfo(Long userId){

        User user = userRepository.findById(userId)
                .orElseThrow(()-> new HaehaeException(ErrorCode.USER_NOT_FOUND));

         UserLevel userInfo = userLevelRepository.getUserLevelInfo(userId);
        return  userInfo;
    }
}
