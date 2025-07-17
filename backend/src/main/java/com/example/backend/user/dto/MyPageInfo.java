package com.example.backend.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class MyPageInfo {

    private Long currentPoint;
    private String levelName;
}
