package com.example.backend.user.vo;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;

public class Address {

    private final String roadAddress;
    private final String bcode;

    public Address(String roadAddress, String bcode){
        if(roadAddress == null || roadAddress.isBlank()){
            throw new HaehaeException(ErrorCode.INVALID_ADDRESS);
        }
        if(bcode == null || bcode.isBlank()){
            throw new HaehaeException(ErrorCode.INVALID_BCODE);
        }
        this.roadAddress = roadAddress;
        this.bcode = bcode;
    }
    public String getRoadAddress() {
        return roadAddress;
    }

    public String getBcode() {
        return bcode;
    }
}
