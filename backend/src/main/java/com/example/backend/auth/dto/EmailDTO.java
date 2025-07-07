package com.example.backend.auth.dto;
import jakarta.validation.Valid;
import com.example.backend.auth.enums.VerificationType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class EmailDTO {

    @Email(message = "이메일 형식이 올바르지 않습니다.")
    @NotBlank(message = "이메일은 필수입니다.")
    private String email;

    @NotNull(message = "인증 타입은 필수 입니다.")
    private VerificationType verificationType;
}
