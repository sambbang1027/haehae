package com.example.backend.user.service;


import com.example.backend.entity.user.User;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.user.dto.LocalRegisterDTO;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.user.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LocalAuthServiceImpl implements AuthService{

    private final UserRepository userRepository;

    //로컬 회원가입
    @Override
    public void localRegister(LocalRegisterDTO localRegisterDTO){
        // VO 검증
        Email email = new Email(localRegisterDTO.getEmail());
        Nickname nickname = new Nickname(localRegisterDTO.getNickname());
        Password password = new Password(localRegisterDTO.getPassword());
        Address address = new Address(localRegisterDTO.getAddress(), localRegisterDTO.getBcode());
        PhoneNumber phoneNumber = new PhoneNumber(localRegisterDTO.getPhoneNumber());

        //email & nickname 중복검사
        if (userRepository.existsByEmail(email.getValue())) {
            throw new HaehaeException(ErrorCode.DUPLICATE_EMAIL);
        }
        if(userRepository.existsByNickname(nickname.getValue())){
            throw new HaehaeException(ErrorCode.DUPLICATE_NICKNAME);
        }

        // 비밀번호 암호화

        User user = User.builder()
                .email(email.getValue())
                .name(localRegisterDTO.getName())
                .passwordHash(password.getValue())
                .nickname(nickname.getValue())
                .phoneNumber(phoneNumber.getValue())
                .birth(localRegisterDTO.getBirth())
                .address(address.getRoadAddress())
                .bcode(address.getBcode())
                .residenceType(localRegisterDTO.getResidenceType())
                .build();


        userRepository.save(user);


    }




}
