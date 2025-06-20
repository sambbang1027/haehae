package com.example.backend.chat.controller;

import com.example.backend.chat.dto.request.ChatMessageRequestDTO;
import com.example.backend.chat.service.ChatMessageCommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatMessageCommandService chatMessageCommandService;

    @MessageMapping("/chat/{chatRoomId}")
    public void handleMessage(@DestinationVariable Long chatRoomId, @Payload ChatMessageRequestDTO chatMessageRequestDTO, Principal principal) {
        System.out.println("💬 메시지 보낸 유저: " + principal.getName() + " 형님!!!");

//        String receiverUsername = "6";

//        String senderUserId = principal.getName();

//        chatMessageRequestDTO.setSenderId(Long.valueOf(senderUserId));

        chatMessageCommandService.creatChatMessage(chatMessageRequestDTO);

        Long receiverUsername = chatMessageRequestDTO.getReceiverId();

        messagingTemplate.convertAndSendToUser(
                String.valueOf(receiverUsername),
                "/queue/messages",
                chatMessageRequestDTO
        );
    }
}
