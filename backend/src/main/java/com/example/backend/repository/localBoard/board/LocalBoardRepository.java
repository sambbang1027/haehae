package com.example.backend.repository.localBoard.board;

import com.example.backend.entity.localBoard.LocalBoards;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LocalBoardRepository extends JpaRepository<LocalBoards, Long>, LocalBoardRepositoryCustom {

}
