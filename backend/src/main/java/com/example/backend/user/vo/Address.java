package com.example.backend.user.vo;

public class Address {

    private final String roadAddress;
    private final String bcode;

    public Address(String roadAddress, String bcode){
        if(roadAddress == null || roadAddress.isBlank()){
            throw new IllegalArgumentException("도로명 주소는 필수입니다.");
        }
        if(bcode == null || bcode.isBlank()){
            throw new IllegalArgumentException("행정동 코드는 필수입니다.");
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
