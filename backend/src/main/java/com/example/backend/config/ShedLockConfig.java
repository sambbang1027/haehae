package com.example.backend.config;

import net.javacrumbs.shedlock.core.LockProvider;
import net.javacrumbs.shedlock.provider.redis.spring.RedisLockProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
public class ShedLockConfig {

    // 락 정보 저장
    @Bean
    public LockProvider lockProvider(RedisConnectionFactory connectionFactory){
        return new RedisLockProvider(connectionFactory);
    }
}
