package com.example.backend.service.localBoard.board;

import com.example.backend.dto.localBoard.board.response.BoardListResponseDTO;
import com.example.backend.repository.localBoard.board.LocalBoardRepository;
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
