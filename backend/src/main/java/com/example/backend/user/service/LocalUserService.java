package com.example.backend.user.service;


import com.example.backend.entity.user.User;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.user.dto.FindIdRequest;
import com.example.backend.user.dto.LocalRegisterDTO;
import com.example.backend.user.dto.ResetUserPwRequest;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.user.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class LocalUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RedisTemplate<String, Object> redisTemplate;
    private final JwtTokenProvider jwtTokenProvider;

    //로컬 회원가입
    @Transactional
    public void localRegister(LocalRegisterDTO localRegisterDTO){
        // VO 검증
        Email email = new Email(localRegisterDTO.getEmail());
        Nickname nickname = new Nickname(localRegisterDTO.getNickname());
        Password password = new Password(localRegisterDTO.getPassword());
        Address address = new Address(localRegisterDTO.getAddress(), localRegisterDTO.getBcode());
        PhoneNumber phoneNumber = new PhoneNumber(localRegisterDTO.getPhoneNumber());

        // 비밀번호 암호화
        String passwordHash = passwordEncoder.encode(password.getValue());

        //email & nickname 중복검사
        if(duplicateNickname(nickname.getValue())){
            throw new HaehaeException(ErrorCode.DUPLICATE_NICKNAME);
        }

        Optional<User> isExisting = userRepository.findByEmail(email.getValue());

        // 유저 이메일이 DB에 존재하면 상태 체크
        if(isExisting.isPresent()){
            User userInfo = isExisting.get();
            if(userInfo.getStatus() == User.Status.INACTIVE) {
               Long result = userRepository.updateReActiveUser(localRegisterDTO, passwordHash, email, nickname,
                                                                phoneNumber, address);
               if(result >0) {
                   return;
               }
            } else if (userInfo.getStatus() == User.Status.BLOCKED) {
                throw new HaehaeException(ErrorCode.DUPLICATE_EMAIL);
            }else {
                throw new HaehaeException(ErrorCode.DUPLICATE_EMAIL);
                // ACTIVE인데도 또 가입 시도하는 경우
            }
        }


        //entity로 변환
        User user = User.builder()
                .userLevelId(1L)
                .levelAchievedAt(LocalDate.now())
                .levelExpireAt(LocalDate.now().plusMonths(3))
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

    // 닉네임 중복검사
    public boolean duplicateNickname (String nickname){
        Nickname nicknameVo = new Nickname(nickname);
        return userRepository.existsByNickname(nicknameVo.getValue());
    }

    // 이메일 중복검사
    public boolean isEmailDuplicated (String email){
        Email emailVo = new Email(email);
        return userRepository.existsByEmail(emailVo.getValue());
    }

    // 이메일 찾기
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

    // 로그인 상태에서 비밀번호 변경
    @Transactional
    public void localUserResetPassword(ResetUserPwRequest resetUserPwRequest, CustomUserDetails customUserDetails){


        Long userId = customUserDetails.getId();

        User user = userRepository.findById(userId)
                .orElseThrow(()-> new HaehaeException(ErrorCode.USER_NOT_FOUND));

        if(!passwordEncoder.matches(resetUserPwRequest.getOldPw(), user.getPasswordHash())){
           throw new HaehaeException(ErrorCode.PASSWORD_NOT_MATCH);

        }

        Password validateNewPw = new Password(resetUserPwRequest.getNewPw());

        String hashPw = passwordEncoder.encode(validateNewPw.getValue());

        user.updatePassword(hashPw);

    }

}
