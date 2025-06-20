package com.example.backend.chat.service;

import com.example.backend.chat.dto.response.ChatRoomResponseDTO;

public interface ChatRoomCommandService {
    public ChatRoomResponseDTO getChatRoom(Long sharingPostId, Long sellerId, String username);
}
