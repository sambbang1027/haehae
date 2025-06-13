package com.example.backend.chat.controller;

import com.example.backend.chat.dto.request.ChatRoomRequestDTO;
import com.example.backend.chat.dto.response.ChatRoomResponseDTO;
import com.example.backend.chat.service.ChatRoomQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
public class ChatRoomController {

    @Autowired
    ChatRoomQueryService chatRoomQueryService;

    @PostMapping("/exist")
    public ResponseEntity<ChatRoomResponseDTO> getChatRoomResponse(@RequestBody ChatRoomRequestDTO chatRoomRequestDTO) {

        Long buyerId = 6L;

        ChatRoomResponseDTO existChatRoom =
        chatRoomQueryService.getChatRoom(chatRoomRequestDTO.getSharingPostId(), chatRoomRequestDTO.getSellerId(), buyerId);

        return ResponseEntity.ok(existChatRoom);
    }

}
