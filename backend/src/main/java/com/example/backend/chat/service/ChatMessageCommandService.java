package com.example.backend.chat.service;

import com.example.backend.chat.dto.request.ChatMessageRequestDTO;

public interface ChatMessageCommandService {
    public void creatChatMessage(ChatMessageRequestDTO chatMessageRequestDTO);
}
