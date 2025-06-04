package com.example.backend.user.vo;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;

import java.util.Objects;


public class Nickname {
    private final String value;

    public Nickname(String value){

        if(!value.matches("^[a-zA-Z가-힣0-9]{2,10}$")){
            throw new HaehaeException(ErrorCode.INVALID_NICKNAME_PATTERN);
        }
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public boolean equals(Object o){
        if(this == o) return true;
        if(!(o instanceof Nickname)) return false;
        Nickname nickname = (Nickname) o;
        return value.equals(nickname.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}
