package com.example.backend.reward.userReward;

import com.example.backend.reward.userReward.dto.request.UserRewardPointRequestInsertDTO;
import com.example.backend.reward.userReward.service.UserRewardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/userReward")
public class UserRewardController {


    private final UserRewardService userRewardService;

    public UserRewardController(UserRewardService userRewardService) {
        this.userRewardService = userRewardService;
    }


    //유저의 현재 포인트
    @GetMapping("/point/{userId}")
    public ResponseEntity<Long> findUserPoint(@PathVariable Long userId){
       Long currentPoint = userRewardService.userFindPoint(userId);
        return new ResponseEntity<Long>(currentPoint, HttpStatus.OK);
    }

    // 리워드 상품 결제
    @PostMapping("/pay")
    public ResponseEntity<Long> paymentReward(@RequestBody UserRewardPointRequestInsertDTO dto){
      Long userPointId =  userRewardService.userRewardPointInsert(dto);
        return new ResponseEntity<>(userPointId, HttpStatus.OK);
    }

    // 리워드 상품 결제 환불
    @PostMapping("/pay/refund/{userPointId}")
    public ResponseEntity<String> payRefundReward(@PathVariable Long userPointId){
        userRewardService.userRewardPayRefund(userPointId);
        return new ResponseEntity<>("환불 처리되었습니다.", HttpStatus.OK);
    }

}
