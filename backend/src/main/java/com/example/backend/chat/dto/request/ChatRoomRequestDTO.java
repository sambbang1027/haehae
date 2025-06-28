package com.example.backend.chat.dto.request;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ChatRoomRequestDTO {
    private Long sharingPostId;
    private Long sellerId;

    public ChatRoomRequestDTO(Long sharingPostId, Long sellerId) {
        this.sharingPostId = sharingPostId;
        this.sellerId = sellerId;
    }
}
