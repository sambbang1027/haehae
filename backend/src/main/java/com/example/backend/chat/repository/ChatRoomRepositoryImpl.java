package com.example.backend.chat.repository;

import com.example.backend.chat.dto.response.ChatRoomResponseDTO;
//import com.example.backend.chat.dto.response.QChatRoomResponseDTO;
//import com.example.backend.entity.chat.QChatRooms;
import com.example.backend.chat.dto.response.QChatRoomResponseDTO;
import com.example.backend.entity.chat.QChatRooms;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

@Repository
public class ChatRoomRepositoryImpl implements ChatRoomRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public ChatRoomRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    //채팅방 조회하기
    public ChatRoomResponseDTO getChatRoomById(Long sharingPostId, Long sellerId, Long buyerId) {
        QChatRooms cr = QChatRooms.chatRooms;

        return queryFactory.
                select(new QChatRoomResponseDTO(
                        cr.chatRoomId,
                        cr.sellerId,
                        cr.buyerId
                ))
                .from(cr)
                .where(cr.sharingPostId.eq(sharingPostId).and(cr.sellerId.eq(sellerId)).and(cr.buyerId.eq(buyerId)))
                .fetchOne()
                ;
    }
}
