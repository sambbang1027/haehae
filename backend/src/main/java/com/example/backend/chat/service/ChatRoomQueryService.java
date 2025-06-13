package com.example.backend.chat.service;

import com.example.backend.chat.dto.response.ChatRoomResponseDTO;

public interface ChatRoomQueryService {
    public ChatRoomResponseDTO getChatRoom(Long sharingPostId, Long sellerId, Long buyerId);
}
