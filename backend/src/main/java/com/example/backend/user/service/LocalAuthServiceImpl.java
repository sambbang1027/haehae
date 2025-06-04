package com.example.backend.user.service;


import com.example.backend.user.dto.LocalRegisterDTO;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.user.vo.Address;
import com.example.backend.user.vo.Email;
import com.example.backend.user.vo.Nickname;
import com.example.backend.user.vo.Password;
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




    }

}
