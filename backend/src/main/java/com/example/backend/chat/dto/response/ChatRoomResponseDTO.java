package com.example.backend.chat.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ChatRoomResponseDTO {
    private Long chatRoomId;
    private Long sharingPostId;
    private Long sellerId;
    private Long buyerId;

    @QueryProjection
    public ChatRoomResponseDTO(Long chatRoomId, Long sharingPostId, Long sellerId, Long buyerId) {
        this.sharingPostId = sharingPostId;
        this.chatRoomId = chatRoomId;
        this.sellerId = sellerId;
        this.buyerId = buyerId;
    }
}
