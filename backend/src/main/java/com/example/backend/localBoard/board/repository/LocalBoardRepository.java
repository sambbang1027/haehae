package com.example.backend.localBoard.board.repository;

import com.example.backend.entity.localBoard.LocalBoards;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LocalBoardRepository extends JpaRepository<LocalBoards, Long>, LocalBoardRepositoryCustom {

}
