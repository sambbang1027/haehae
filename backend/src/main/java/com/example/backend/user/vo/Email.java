package com.example.backend.user.vo;


import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;

import java.util.Objects;

public class Email {
    private final String value;

    public Email(String value) {
        if (!value.matches("^[\\w.-]+@[\\w.-]+\\.\\w+$")) {
            throw new HaehaeException(ErrorCode.INVALID_EMAIL_FORMAT);
        }
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Email)) return false;
        Email email = (Email) o;
        return value.equals(email.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }

}
