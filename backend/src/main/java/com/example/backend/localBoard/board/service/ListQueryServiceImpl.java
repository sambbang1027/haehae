package com.example.backend.localBoard.board.service;

import com.example.backend.localBoard.board.dto.response.BoardListResponseDTO;
import com.example.backend.localBoard.board.repository.LocalBoardRepository;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class ListQueryServiceImpl implements ListQueryService {

    private final LocalBoardRepository localBoardRepository;

    public ListQueryServiceImpl(LocalBoardRepository localBoardRepository) {
        this.localBoardRepository = localBoardRepository;
    }

    @Override
    public List<BoardListResponseDTO> queryPostList(Long userId){
          String userRegionCode = "1168010300";
          String preFixRegionCode = userRegionCode.substring(0, 5);
          List<BoardListResponseDTO> list = localBoardRepository.getLocalBoardListByRegion(preFixRegionCode);
        return  list;
    }

    @Override
    public String queryRegion(Long userId){
        String fullAddress = localBoardRepository.getRegionById(userId);

        if (fullAddress == null || fullAddress.isBlank()) return null;

        Pattern pattern = Pattern.compile("\\s(\\S+구)\\s?");
        Matcher matcher = pattern.matcher(fullAddress);

        if (matcher.find()) {
            return matcher.group(1);
        } else {
            return null;
        }
    };
}
