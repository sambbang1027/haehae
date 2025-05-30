package com.example.backend.repository.localBoard;

import com.example.backend.dto.localBoard.LocalBoardListDTO;

import java.util.List;

public interface LocalBoardRepositoryCustom {

   List<LocalBoardListDTO> getLocalBoardListByRegion(String regionCode);
}
