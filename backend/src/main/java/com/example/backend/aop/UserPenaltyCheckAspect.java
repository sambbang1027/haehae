package com.example.backend.aop;

import com.example.backend.exception.PenaltyException;
import com.example.backend.userPenalty.service.UserPenaltyService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(1)
public class UserPenaltyCheckAspect {

    private final UserPenaltyService userPenaltyService;

    public UserPenaltyCheckAspect(UserPenaltyService userPenaltyService) {
        this.userPenaltyService = userPenaltyService;
    }

    @Pointcut("@annotation(com.example.backend.annotation.CheckPenalty)")
    public void checkPenaltyPointcut(){}


    @Around("checkPenaltyPointcut()")
    public Object beforeCheckPenalty(ProceedingJoinPoint joinPoint)  throws Throwable {
        Object[] args = joinPoint.getArgs();
        Long userId = null;
        for (Object arg : args) {
            try {
                userId = (Long) arg.getClass().getMethod("getUserId").invoke(arg);
                if(userId != null){
                    break;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        
        String remainTime = userPenaltyService.existEndAtUserId(userId);
        if (remainTime != null) {
            throw new PenaltyException("활동 제한 중입니다. 남은 시간: " + remainTime);
        }

        return joinPoint.proceed();
    }
}
