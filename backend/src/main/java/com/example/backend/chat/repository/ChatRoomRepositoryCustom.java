package com.example.backend.chat.repository;

import com.example.backend.chat.dto.response.ChatRoomResponseDTO;

public interface ChatRoomRepositoryCustom {
    public ChatRoomResponseDTO getChatRoomById(Long chatRoomId, Long sellerId, Long buyerId);
}
