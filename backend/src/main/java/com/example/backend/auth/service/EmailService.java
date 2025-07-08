package com.example.backend.auth.service;

import com.example.backend.auth.dto.EmailDTO;
import com.example.backend.auth.enums.VerificationType;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.user.service.UserService;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import io.github.cdimascio.dotenv.Dotenv;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Duration;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
public class EmailService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final UserService userService;
    private final String apiKey = Dotenv.load().get("SENDGRID_API_KEY");

    // 이메일 발송 핸들러
    public void handleSendMail(EmailDTO emailDTO){
        String email = emailDTO.getEmail();
        VerificationType type = emailDTO.getVerificationType();

        switch (type){
            case SignUp -> {
                if(userService.isEmailDuplicated(email)){
                    throw new HaehaeException(ErrorCode.DUPLICATE_EMAIL);
                }
            }
            case FindPw -> {
                if(!userService.isEmailDuplicated(email)){
                    throw new HaehaeException(ErrorCode.USER_NOT_FOUND);
                }
            }
            default -> throw new HaehaeException(ErrorCode.INVALID_VERIFICATION_TYPE);
        }
         sendVerificationMail(type, email);
    }


    //회원가입 메일 발송
    public void sendVerificationMail(VerificationType type, String toEmail){

        // 보내는 사람, 받는사람
        Email from = new Email("support@haehae.it.com");
        Email to = new Email(toEmail);

        //Code 생성
        String code = create6Code();

        // 제목, 내용
        String subject = "[HaeHae] 이메일 인증코드 입니다.";
        Content content = new Content("text/plain",
                "[HaeHae] 이메일 인증 안내\n\n" +
                        "안녕하세요. HaeHae 서비스팀입니다.\n\n" +
                        "아래 인증 코드를 입력해 주세요.\n\n" +
                        "인증 코드: " + code + "\n\n" +
                        "본 코드는 보안을 위해 5분 후 만료됩니다.\n" +
                        "타인에게 노출되지 않도록 주의해 주세요.\n\n" +
                        "감사합니다.\nHaeHae 드림");

        // 메일 생성
        Mail mail = new Mail(from, subject, to, content);

        // sendgrid api 객체 생성
        SendGrid sg = new SendGrid(apiKey);
        Request rq = new Request();

        try{
            rq.setMethod(Method.POST);
            rq.setEndpoint("mail/send");
            rq.setBody(mail.build());

            Response response = sg.api(rq);
            System.out.println("응답 코드: " + response.getStatusCode());
            System.out.println("응답 내용: " + response.getBody());
            System.out.println("응답 헤더: " + response.getHeaders());

            saveVerificationCode(type, toEmail, code);

        }catch (IOException e){
            throw new HaehaeException(ErrorCode.EMAIL_IO_ERROR);
        } catch (Exception e) {
            throw  new HaehaeException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    // 인증코드 만들기
    public String create6Code(){
        return String.valueOf((int)(Math.random()*900000 + 100000));
    }

    // redis 코드 저장
    public void saveVerificationCode(VerificationType verifyType, String email, String code){
        try{

            String key = "email:verify:"+verifyType + ":" +email;
            System.out.println("⛳ Redis 저장 시도: key=" + key + ", code=" + code);

            redisTemplate.opsForValue().set(key,code, Duration.ofMinutes(5));
            System.out.println("저장된 코드 :"+ redisTemplate.opsForValue().get(key));

        }catch (Exception e){
            log.error(e.getMessage());
        }
    }

    // redis 코드 조회 및 비교
    public boolean checkVerificationCode(VerificationType verifyType, String email, String inputCode){
        String key = "email:verify:"+verifyType + ":" +email;
        String saveCode = (String) redisTemplate.opsForValue().get(key);

        if (!inputCode.equals(saveCode)) {
            log.warn("인증코드 불일치: input={}, saved={}, key={}", inputCode, saveCode, key);
            throw new HaehaeException(ErrorCode.INVALID_VERIFICATION_CODE);
        }
        redisTemplate.delete(key);
        return true;
    }

    // 코드 삭제
    public void deleteVerificationCode(VerificationType verifyType, String email){
        String key = "email:verify:"+ verifyType + ":" +email;
        redisTemplate.delete(key);
    }


    // 비밀번호 재설정 redis 코드 검증 토큰 발급
    public String verifyPwCodeAndIssueToken(String email, String code) {
        boolean verified = checkVerificationCode(VerificationType.FindPw, email, code);

        if(!verified){
            throw new HaehaeException(ErrorCode.INVALID_VERIFICATION_CODE);
        }
        deleteVerificationCode(VerificationType.FindPw, email);

        String randomStr = UUID.randomUUID().toString();

        redisTemplate.opsForValue().set("pw-reset:"+randomStr, email, Duration.ofMinutes(5));


        return randomStr;
    }

}
