package com.example.backend.user.service;


import com.example.backend.auth.enums.VerificationType;
import com.example.backend.entity.user.User;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.user.dto.FindIdRequest;
import com.example.backend.user.dto.LocalRegisterDTO;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.user.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class LocalUserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisTemplate<String, Object> redisTemplate;

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


        if (userRepository.existsByEmail(email.getValue())) {
            throw new HaehaeException(ErrorCode.DUPLICATE_EMAIL);
        }
        if(userRepository.existsByNickname(nickname.getValue())){
            throw new HaehaeException(ErrorCode.DUPLICATE_NICKNAME);
        }
    }

    // 닉네임 중복검사
    @Override
    public boolean duplicateNickname (String nickname){
        Nickname nicknameVo = new Nickname(nickname);
        return userRepository.existsByNickname(nicknameVo.getValue());
    }

    // 이메일 중복검사
    @Override
    public boolean isEmailDuplicated (String email){
        Email emailVo = new Email(email);
        return userRepository.existsByEmail(emailVo.getValue());
    }

    // 이메일 찾기
    @Override
    public String findEmailByNmaeAndPhoneNum(FindIdRequest findIdRequest){
        String email = userRepository.findEmailByUsernameAndPhoneNumber(findIdRequest.getName(),findIdRequest.getPhoneNumber());
        if (email == null){
            throw new HaehaeException(ErrorCode.USER_NOT_FOUND);
        }

        int atIndex = email.indexOf("@");
        if (atIndex <= 1) return "***"; // 예외 처리

        // localpart@domainpart
        String localPart = email.substring(0, atIndex);
        String domainPart = email.substring(atIndex);

        int visibleLength = Math.max(1, localPart.length() / 3); // 최소 1글자 보이기

        String visible = localPart.substring(0, visibleLength);
        String masked = visible + "*".repeat(localPart.length() - visibleLength);

        return masked + domainPart;
    }

    // 비밀번호 재설정
    @Transactional
    @Override
    public void resetPassword (String token, String newPw){

        String key = "pw-reset:"+token;
        String email = (String) redisTemplate.opsForValue().get(key);
        Password verifiedPw = new Password(newPw);

        if(email == null){
            throw new HaehaeException(ErrorCode.VERIFICATION_TOKEN_NOT_FOUND);
        }

        String passwordHash = passwordEncoder.encode(verifiedPw.getValue());

        User user = userRepository.findByEmail(email)
                        .orElseThrow(() -> new HaehaeException(ErrorCode.USER_NOT_FOUND));

        user.updatePassword(passwordHash);
        redisTemplate.delete(key);

    }
}
