package com.example.backend.chat.service;

import com.example.backend.chat.dto.response.ChatRoomResponseDTO;
import com.example.backend.chat.repository.ChatRoomRepository;
import com.example.backend.entity.chat.ChatRooms;
import com.example.backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatRoomCommandServiceImpl implements ChatRoomCommandService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Autowired
    private UserRepository userRepository;
    
    //채팅방 생성 및 조회
    @Override
    public ChatRoomResponseDTO getChatRoom(Long sharingPostId, Long sellerId, String username) {
        
        //1. username(email ID)으로 구매자 고유의 userId 조회
        Long buyerId = userRepository.findIdByUsername(username);

        //2. sharingPostId, sellerId, buyerId를 통해서 채팅방이 있는지 조회
        ChatRoomResponseDTO existChatRoom = chatRoomRepository.getChatRoomById(sharingPostId, sellerId, buyerId);

        //3-1. 조건에 해당하는 채팅방 없을 시, null 반환
        if (existChatRoom == null) {

            //4. 채팅방 생성
            ChatRooms createChatRoom = ChatRooms
                    .builder()
                    .sharingPostId(sharingPostId)
                    .sellerId(sellerId)
                    .buyerId(buyerId)
                    .roomStatus(ChatRooms.RoomStatus.ACTIVE)
                    .build();

            ChatRooms createdChatRoom = chatRoomRepository.save(createChatRoom);

            //5. 웹 소켓 연결 및 채팅 메시지에 사용할 chatRoodId, sellerId, buyerId 데이터 반환
            return new ChatRoomResponseDTO(createdChatRoom.getChatRoomId(), createdChatRoom.getSharingPostId(), createdChatRoom.getSellerId(), createdChatRoom.getBuyerId());
        }

        // 3-2. 채팅방 없을 시, 기존의 채팅방 내용 반환
        return existChatRoom;
    };
}
