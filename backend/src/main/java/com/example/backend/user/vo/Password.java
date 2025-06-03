package com.example.backend.user.vo;

public class Password {

    private final String value;

    public Password(String value){

        if(!value.matches("^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=]).{8,12}$")){
            throw new IllegalArgumentException("비밀번호는 영문자, 숫자, 특수문자를 포함한 8~12여야 합니다.");
        }
        this.value =value;
    }

    public String getValue(){
        return value;
    }

}
