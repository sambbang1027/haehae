package com.example.backend.chat.controller;

import com.example.backend.chat.dto.request.ChatMessageRequestDTO;
import com.example.backend.chat.service.ChatMessageCommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatMessageCommandService chatMessageCommandService;

    @MessageMapping("/chat/{chatRoomId}")
    public void handleMessage(@DestinationVariable Long chatRoomId, @Payload ChatMessageRequestDTO chatMessageRequestDTO) {

//        String receiverUsername = "6";

        chatMessageCommandService.creatChatMessage(chatMessageRequestDTO);

        Long receiverUsername = chatMessageRequestDTO.getSenderId();

        messagingTemplate.convertAndSendToUser(
                String.valueOf(receiverUsername),
                "/queue/messages",
                chatMessageRequestDTO
        );
    }
}
