package com.example.backend.chat.service;

import com.example.backend.chat.dto.request.ChatMessageRequestDTO;
import com.example.backend.chat.repository.ChatMessageRepository;
import com.example.backend.entity.chat.ChatMessages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatMessageCommandServiceImpl implements ChatMessageCommandService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Override
    public void creatChatMessage(ChatMessageRequestDTO chatMessageRequestDTO) {

        ChatMessages chatMessages = ChatMessages
                .builder()
                .roomId(chatMessageRequestDTO.getRoomId())
                .senderId(chatMessageRequestDTO.getSenderId())
                .message(chatMessageRequestDTO.getMessage())
                .messageType(chatMessageRequestDTO.getMessageType())
                .build();

        chatMessageRepository.save(chatMessages);
    }
}
