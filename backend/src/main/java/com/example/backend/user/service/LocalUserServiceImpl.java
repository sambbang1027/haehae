package com.example.backend.user.service;


import com.example.backend.entity.user.User;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.user.dto.LocalRegisterDTO;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.user.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class LocalUserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    //로컬 회원가입
    @Transactional
    @Override
    public void localRegister(LocalRegisterDTO localRegisterDTO){
        // VO 검증
        Email email = new Email(localRegisterDTO.getEmail());
        Nickname nickname = new Nickname(localRegisterDTO.getNickname());
        Password password = new Password(localRegisterDTO.getPassword());
        Address address = new Address(localRegisterDTO.getAddress(), localRegisterDTO.getBcode());
        PhoneNumber phoneNumber = new PhoneNumber(localRegisterDTO.getPhoneNumber());

        //email & nickname 중복검사
        validateDuplicateUser(email,nickname);

        // 비밀번호 암호화
        String passwordHash = passwordEncoder.encode(password.getValue());

        //entity로 변환
        User user = User.builder()
                .email(email.getValue())
                .name(localRegisterDTO.getName())
                .passwordHash(passwordHash)
                .nickname(nickname.getValue())
                .phoneNumber(phoneNumber.getValue())
                .birth(localRegisterDTO.getBirth())
                .address(address.getRoadAddress())
                .bcode(address.getBcode())
                .residenceType(localRegisterDTO.getResidenceType())
                .build();

        try {
            userRepository.save(user);
            // 동시성(race condition)이나 DB 제약 위반 가능성을 고려
        }catch (DataIntegrityViolationException e) {
            throw new HaehaeException(ErrorCode.DUPLICATE_EMAIL);
        } catch (Exception e) {
            throw new HaehaeException(ErrorCode.DATABASE_ERROR);
        }
    }

    // 이메일, 닉네임 중복검사
    private void validateDuplicateUser(Email email, Nickname nickname){
        System.out.println("Checking email: " + email.getValue());
        boolean emailExists = userRepository.existsByEmail(email.getValue());
        System.out.println("Email exists? " + emailExists);

        if (userRepository.existsByEmail(email.getValue())) {
            throw new HaehaeException(ErrorCode.DUPLICATE_EMAIL);
        }
        if(userRepository.existsByNickname(nickname.getValue())){
            throw new HaehaeException(ErrorCode.DUPLICATE_NICKNAME);
        }
    }

    // 닉네임 중복검사
    public boolean duplicateNickname (String nickname){
        return userRepository.existsByNickname(nickname);
    }

    // 이메일 중복검사
    public boolean duplicateEmail (String email){
        return userRepository.existsByEmail(email);
    }
}
