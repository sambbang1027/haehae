package com.example.backend.chat.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ChatRoomResponseDTO {
    private Long chatRoomId;
    private Long sellerId;
    private Long buyerId;

    @QueryProjection
    public ChatRoomResponseDTO(Long chatRoomId, Long sellerId, Long buyerId) {
        this.chatRoomId = chatRoomId;
        this.sellerId = sellerId;
        this.buyerId = buyerId;
    }
}
