package com.example.backend.repository.localBoard;

import com.example.backend.dto.localBoard.LocalBoardListDTO;
import com.example.backend.entity.localBoard.LocalBoards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LocalBoardRepository extends JpaRepository<LocalBoards, Long>, LocalBoardRepositoryCustom {

}
