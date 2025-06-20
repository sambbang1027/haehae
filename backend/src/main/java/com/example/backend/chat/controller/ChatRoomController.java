package com.example.backend.chat.controller;

import com.example.backend.chat.dto.request.ChatRoomRequestDTO;
import com.example.backend.chat.dto.response.ChatRoomResponseDTO;
import com.example.backend.chat.service.ChatRoomCommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/chat")
public class ChatRoomController {

    @Autowired
    ChatRoomCommandService chatRoomCommandService;

    //채팅방 유무 조회 또는 생성
    @PostMapping("/exist")
    public ResponseEntity<ChatRoomResponseDTO> getChatRoomResponse(@RequestBody ChatRoomRequestDTO chatRoomRequestDTO, @AuthenticationPrincipal UserDetails userDetails) {

        String username = userDetails.getUsername();

        ChatRoomResponseDTO existChatRoom =
        chatRoomCommandService.getChatRoom(chatRoomRequestDTO.getSharingPostId(), chatRoomRequestDTO.getSellerId(), username);

        return ResponseEntity.ok(existChatRoom);
    }

}
