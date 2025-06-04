package com.example.backend.user.vo;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;

public class Password {

    private final String value;

    public Password(String value){

        if(!value.matches("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=]).{8,12}$")){
            throw new HaehaeException(ErrorCode.INVALID_PASSWORD_PATTERN);
        }
        this.value =value;
    }

    public String getValue(){
        return value;
    }

}
