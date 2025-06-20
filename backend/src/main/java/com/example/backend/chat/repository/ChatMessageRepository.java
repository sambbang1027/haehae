package com.example.backend.chat.repository;

import com.example.backend.entity.chat.ChatMessages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessages, Long>, ChatMessageRepositoryCustom {
}
