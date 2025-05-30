package com.example.backend.repository;

import com.example.backend.entity.localBoard.LocalBoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocalBoardRepository extends JpaRepository<LocalBoardEntity, Long> {
    
}
