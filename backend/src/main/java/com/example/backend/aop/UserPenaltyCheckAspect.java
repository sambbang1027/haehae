//package com.example.backend.aop;
//
//import com.example.backend.userPenalty.service.UserPenaltyService;
//import org.aspectj.lang.annotation.Aspect;
//import org.aspectj.lang.annotation.Before;
//import org.aspectj.lang.annotation.Pointcut;
//import org.springframework.stereotype.Component;
//
//@Aspect
//@Component
//public class UserPenaltyCheckAspect {
//
//    private final UserPenaltyService userPenaltyService;
//
//    public UserPenaltyCheckAspect(UserPenaltyService userPenaltyService) {
//        this.userPenaltyService = userPenaltyService;
//    }
//
//    @Pointcut("@annotation(com.example.backend.annotation.checkPenalty")
//    public void checkPenaltyPointcut(){}
//
//
//    @Before("checkPenaltyPointcut() && args(userId,..)")
//    public void beforeCheckPenalty(Long userId) {
//        String remainTime = userPenaltyService.existEndAtUserId(userId);
//        if (remainTime != null) {
//            throw new IllegalStateException("활동 제한 중입니다. 남은 시간: " + remainTime);
//        }
//    }
//}
