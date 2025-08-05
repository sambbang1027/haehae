package com.example.backend.localBoard.board.repository;

import com.example.backend.entity.localBoard.LocalBoards;
import com.example.backend.localBoard.board.dto.request.UpdateContentRequestDTO;
import com.example.backend.localBoard.board.dto.response.BoardListResponseDTO;
import com.example.backend.localBoard.board.dto.response.ContentResponseDTO;

import java.util.List;

public interface LocalBoardRepositoryCustom {

   String getRegionCodeById(long userId);

   List<BoardListResponseDTO> getLocalBoardListByRegion(String regionCode);

   List<BoardListResponseDTO> searchLocalBoardListByNicknameOrTitle(String regionCode, String searchContent);

   ContentResponseDTO getLocalBoardDetailById(long localBoardId);

   void updateDetailContent (long localBoardId, UpdateContentRequestDTO updateContentRequestDTO);

   String getRegionById(long userId);

   void boardStatusReport(Long id, LocalBoards.BoardStatus status);

}
