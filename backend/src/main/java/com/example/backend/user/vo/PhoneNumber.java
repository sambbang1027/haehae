package com.example.backend.user.vo;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;

public class PhoneNumber {
    private final String value;

    public PhoneNumber(String value){

        if(value==null || !value.matches("^01[016-9][0-9]{7,8}$")){
            throw new HaehaeException(ErrorCode.INVALID_PHONE_NUMBER);
        }

        this.value = value;
    }

    public String getValue() {
        return value;
    }

    // 하이픈 추가해주는 포멧팅
    public String getFormatted(){
        if(value.length() ==10){
            return value.replaceFirst("(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3");
        }else {
            return value.replaceFirst("(\\d{3})(\\d{4})(\\d{4})","$1-$2-$3");
        }
    }
}
