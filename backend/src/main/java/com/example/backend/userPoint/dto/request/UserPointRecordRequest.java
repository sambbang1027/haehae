package com.example.backend.userPoint.dto.request;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserPointRecordRequest {

    private Long userId;
    private int filterRange;
    private int page;
    private int size;
}
