package com.example.backend.auth.service;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class EmailService {


    private  String apiKey;

    public  EmailService(){
        Dotenv dotenv = Dotenv.load();
        this.apiKey = dotenv.get("SENDGRID_API_KEY");
    }

    public String sendMail(String toEmail){
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
                        "아래 인증 코드를 회원가입 화면에 입력해 주세요.\n\n" +
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
            return code;
        }catch (IOException e){
            throw new HaehaeException(ErrorCode.EMAIL_IO_ERROR);
        } catch (Exception e) {
            throw  new HaehaeException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    public String create6Code(){
        return String.valueOf((int)(Math.random()*900000 + 100000));
    }
}
