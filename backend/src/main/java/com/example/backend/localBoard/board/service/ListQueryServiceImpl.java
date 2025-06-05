package com.example.backend.localBoard.board.service;

import com.example.backend.localBoard.board.dto.response.BoardListResponseDTO;
import com.example.backend.localBoard.board.repository.LocalBoardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListQueryServiceImpl implements ListQueryService {

    private final LocalBoardRepository localBoardRepository;

    public ListQueryServiceImpl(LocalBoardRepository localBoardRepository) {
        this.localBoardRepository = localBoardRepository;
    }

    @Override
    public List<BoardListResponseDTO> getPostList(Long userId){
//        String userAddress = localBoardRepository.getRegionCodeById(userId);
//
//        List<BoardListResponseDTO> list = localBoardRepository.getLocalBoardListByRegion(userAddress);
          String userRegionCode = "1168010300";
          List<BoardListResponseDTO> list = localBoardRepository.getLocalBoardListByRegion(userRegionCode);
        return  list;
    }
}
