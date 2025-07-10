package com.example.backend.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
public class HaehaeResponse<T> {

    private String code;
    private String message;
    private T data;

    public HaehaeResponse(String code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static <T> HaehaeResponse<T> ok(T data) {
        return new HaehaeResponse<>("SUCCESS", "요청이 성공적으로 처리되었습니다.", data);
    }

    public static HaehaeResponse<Void> ok() {
        return new HaehaeResponse<>("SUCCESS", "요청이 성공적으로 처리되었습니다.", null);
    }
}

