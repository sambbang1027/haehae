package com.example.backend.entity.chat;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.boot.autoconfigure.web.WebProperties;

import java.awt.*;
import java.sql.Timestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name = "chat_messages")
public class ChatMessages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_message_id")
    private Long chatMessageId;

    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "sender_id")
    private Long senderId;

    private String message;

    @Column(name = "send_at")
    private Timestamp sendAt;

    @Column(name = "is_read")
    private int isRead;

    @Enumerated(EnumType.STRING)
    private MessageType messageType;

    public enum MessageType {
        text,
        image
    }

    @PrePersist
    protected void onCreate() {
        this.sendAt = new Timestamp(System.currentTimeMillis());
    }
}
