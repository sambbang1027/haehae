package com.example.backend.chat.service;

import com.example.backend.chat.dto.response.ChatRoomResponseDTO;
import com.example.backend.chat.repository.ChatRoomRepository;
import com.example.backend.entity.chat.ChatRooms;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatRoomQueryQueryServiceImpl implements ChatRoomQueryService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Override
    public ChatRoomResponseDTO getChatRoom(Long sharingPostId, Long sellerId, Long buyerId) {

        ChatRoomResponseDTO existChatRoom = chatRoomRepository.getChatRoomById(sharingPostId, sellerId, buyerId);

        if (existChatRoom == null) {
            ChatRooms createChatRoom = ChatRooms
                    .builder()
                    .sharingPostId(sharingPostId)
                    .sellerId(sellerId)
                    .buyerId(buyerId)
                    .roomStatus(ChatRooms.RoomStatus.ACTIVE)
                    .build();

            ChatRooms createdChatRoom = chatRoomRepository.save(createChatRoom);

            return new ChatRoomResponseDTO(createdChatRoom.getChatRoomId(), createdChatRoom.getSellerId(), createdChatRoom.getBuyerId());
        }

        return existChatRoom;
    };
}
