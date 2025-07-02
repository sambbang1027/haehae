package com.example.backend.userPoint.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;

@Getter
@Setter
@ToString
public class PaymentResponseDTO {
    private long id;
    private long amount;
    private Timestamp createdAt;
    private String name;
    private List<String> rewardItemsImgUrl;

    @QueryProjection
    public PaymentResponseDTO(long id,  long amount, Timestamp createdAt, String name, String rewardItemsImgUrl){
        this.id = id;
        this.amount = amount;
        this.createdAt = createdAt;
        this.name = name;
        this.rewardItemsImgUrl = (rewardItemsImgUrl != null) ? Collections.singletonList(rewardItemsImgUrl) : Collections.emptyList();
    }
}
