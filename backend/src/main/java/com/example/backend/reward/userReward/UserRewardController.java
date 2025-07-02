package com.example.backend.reward.userReward;

import com.example.backend.reward.userReward.dto.request.UserRewardPointRequestInsertDTO;
import com.example.backend.reward.userReward.service.UserRewardService;
import com.example.backend.userPoint.dto.response.PaymentResponseDTO;
import com.google.api.Http;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/userReward")
public class UserRewardController {


    private final UserRewardService userRewardService;

    public UserRewardController(UserRewardService userRewardService) {
        this.userRewardService = userRewardService;
    }

    @GetMapping("/point/{userId}")
    public ResponseEntity<Long> findUserPoint(@PathVariable Long userId){
       Long currentPoint = userRewardService.userFindPoint(userId);
        return new ResponseEntity<Long>(currentPoint, HttpStatus.OK);
    }

    @PostMapping("/pay")
    public ResponseEntity<Long> paymentReward(@RequestBody UserRewardPointRequestInsertDTO dto){
      Long userPointId =  userRewardService.userRewardPointInsert(dto);
        return new ResponseEntity<>(userPointId, HttpStatus.OK);
    }

    @PostMapping("/pay/refund/{userPointId}")
    public ResponseEntity<String> payRefundReward(@PathVariable Long userPointId){
        userRewardService.userRewardPayRefund(userPointId);
        return new ResponseEntity<>("환불 처리되었습니다.", HttpStatus.OK);
    }

}
