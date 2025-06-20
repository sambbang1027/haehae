package com.example.backend.chat.repository;

import com.example.backend.entity.chat.ChatRooms;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRooms, Long>, ChatRoomRepositoryCustom {
}
