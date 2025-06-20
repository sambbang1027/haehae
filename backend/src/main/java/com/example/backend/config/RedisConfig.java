package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    // Redis에 문자열 키-값 저장할 때 사용
    // 간단한 캐시나 인증 코드 저장용
    @Bean
    public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory connectionFactory){
        return new StringRedisTemplate(connectionFactory);
    }


    // 문자열 key + 객체 value 저장
    // 객체를 Json형태로 직렬화해서 저장하고 읽을때는 자동 역직렬화
    // 객체 캐시, 세션 저장 등에 적합
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory){
        RedisTemplate<String , Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        //직렬화 설정
        template.setKeySerializer(new StringRedisSerializer()); // key -> String
        template.setValueSerializer(new GenericJackson2JsonRedisSerializer()); // value -> Json

        return template;
    }
}
