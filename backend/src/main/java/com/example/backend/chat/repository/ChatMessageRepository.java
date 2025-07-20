package com.example.backend.chat.repository;

import com.example.backend.entity.chat.ChatMessages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChatMessageRepository extends JpaRepository<ChatMessages, Long>, ChatMessageRepositoryCustom {
    @Query(" SELECT c.senderId FROM ChatMessages c " +
            " WHERE c.chatMessageId= :chatMessageId")
    Long findChatMessageUserId(@Param("chatMessageId") Long chatMessageId);

}
