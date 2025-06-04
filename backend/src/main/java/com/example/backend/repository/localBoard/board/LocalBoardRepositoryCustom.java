package com.example.backend.repository.localBoard.board;

import com.example.backend.dto.localBoard.board.response.BoardListResponseDTO;
import com.example.backend.dto.localBoard.board.response.ContentResponseDTO;

import java.util.List;

public interface LocalBoardRepositoryCustom {

   String getRegionCodeById(long userId);

   List<BoardListResponseDTO> getLocalBoardListByRegion(String regionCode);

   List<BoardListResponseDTO> searchLocalBoardListByNicknameOrTitle(String regionCode, String searchContent);

   ContentResponseDTO getLocalBoardDetailById(long localBoardId);

}
