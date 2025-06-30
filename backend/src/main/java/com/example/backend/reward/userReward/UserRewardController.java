package com.example.backend.reward.userReward;

import com.example.backend.reward.userReward.dto.request.UserRewardPointRequestInsertDTO;
import com.example.backend.reward.userReward.service.UserRewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/userReward")
public class UserRewardController {

    @Autowired
    private UserRewardService userRewardService;

    @GetMapping("/point/{userId}")
    public ResponseEntity<Long> findUserPoint(@PathVariable Long userId){
       Long currentPoint = userRewardService.userFindPoint(userId);
        return new ResponseEntity<Long>(currentPoint, HttpStatus.OK);
    }

    @PostMapping("/pay")
    public ResponseEntity<String> paymentReward(@RequestBody UserRewardPointRequestInsertDTO dto){
        userRewardService.UserRewardPointInsert(dto);
        return new ResponseEntity<>("결제가 완료되었습니다.", HttpStatus.OK);
    }


}
