package com.example.backend.common.util;

import com.example.backend.user.repository.UserRepository;
import com.example.backend.userLevel.repsoitory.UserLevelRepository;
import com.example.backend.userLevel.service.UserLevelService;
import com.example.backend.userPoint.repository.UserPointRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.javacrumbs.shedlock.spring.annotation.SchedulerLock;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class LevelUpdateScheduler {

    private final UserLevelService userLevelService;
    private final UserRepository userRepository;
    private final UserPointRepository userPointRepository;
    private final UserLevelRepository userLevelRepository;

    // 등급 재산정
    /* 매일 자정
     * 스케줄러 중복방지(작업이 실패해도 최대 10분간 락, 작업이 1초만에 끝나도 5분간 락)
     */
    @Scheduled(cron = "0 0 0 * * *")
    @SchedulerLock(name = "userLevelUpdate", lockAtLeastFor = "PT5M", lockAtMostFor = "PT10M")
    public void setUserLevel (){
        log.info("업데이트 실행 ");
        // 오늘 만료인 사람들
        List<Long> todayExpired = userRepository.todayLevelExpired(LocalDate.now());
        // 6개월간 포인트 합산
        Map<Long, Long> totalPoint = userPointRepository.getUserPointFor6month(todayExpired);
        log.info("합산 ::"+ totalPoint);

        // 모든 유저에게 새로운 등급 부여
        Map<Long, Long> userToLevelMap = new HashMap<>();
        for (Map.Entry<Long, Long> entry : totalPoint.entrySet()) {
            Long userId = entry.getKey();
            Long point = entry.getValue();
            Long levelId = userLevelRepository.resetUserLevel(point); // 각자 다른 등급
            userToLevelMap.put(userId, levelId);
        }
        log.info("새로운 등급 "+ userToLevelMap );
        // 동일한 등급의 유저끼리 그룹핑
        Map<Long, List<Long>> levelToUsersMap = new HashMap<>();
        for(Map.Entry<Long, Long > entry : userToLevelMap.entrySet()){
            Long userId = entry.getKey();
            Long levelId = entry.getValue();
            levelToUsersMap.computeIfAbsent(levelId , k -> new ArrayList<>()).add(userId);
        }

        log.info("그룹핑 ::" + levelToUsersMap);

        // 등급별 bulk update
        for (Map.Entry<Long, List<Long>> entry : levelToUsersMap.entrySet()) {
            Long levelId = entry.getKey();
            List<Long> userIds = entry.getValue();

            userLevelService.bulkUpdateUsers(levelId,userIds);
        }
    }

}
