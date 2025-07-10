package com.example.backend.userPoint.dto.request;

import com.example.backend.entity.user.UserPoint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserMissionSuccessRequestDTO {
    private Long userId;
    private Long amount;
    private String source;

    private Long userMissionId;


    public UserPoint toEntity(){
        return UserPoint.builder()
                .userId(userId)
                .pointType("적립")
                .amount(amount)
                .source(source)
                .build();
    }
}


