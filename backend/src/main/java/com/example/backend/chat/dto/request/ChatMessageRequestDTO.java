package com.example.backend.chat.dto.request;

import com.example.backend.entity.chat.ChatMessages;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.sql.Timestamp;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class ChatMessageRequestDTO {
    private Long roomId;
    private Long senderId;
    private String message;
    private Timestamp sendAt;
    private int isRead;
    private ChatMessages.MessageType messageType;

    @QueryProjection
    public ChatMessageRequestDTO(Long roomId, Long senderId, String message, Timestamp sendAt, int isRead, ChatMessages.MessageType messageType) {
        this.roomId = roomId;
        this.senderId = senderId;
        this.message = message;
        this.sendAt = sendAt;
        this.isRead = isRead;
        this.messageType = messageType;
    }
}
