package com.example.backend.userLevel.service;

import com.example.backend.entity.user.User;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.userLevel.dto.UserLevel;
import com.example.backend.userLevel.repsoitory.UserLevelRepository;
import com.example.backend.userPoint.repository.UserPointRepository;
import lombok.RequiredArgsConstructor;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserLevelService {

    private final UserLevelRepository userLevelRepository;
    private final UserRepository userRepository;


    // 유저 등급 정보
    public UserLevel getUserLevelInfo(Long userId){

        User user = userRepository.findById(userId)
                .orElseThrow(()-> new HaehaeException(ErrorCode.USER_NOT_FOUND));

         UserLevel userInfo = userLevelRepository.getUserLevelInfo(userId);
        return  userInfo;
    }


    @Transactional
    public void bulkUpdateUsers(Long levelId , List<Long>userIds){
        Long result =  userRepository.bulkUpdateUserLevel(levelId, userIds, LocalDate.now(), LocalDate.now().plusMonths(3));
        if (result == 0){
            throw new HaehaeException(ErrorCode.NO_CONTENT_UPDATED);
        }
    }
}
