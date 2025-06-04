package com.example.backend.service.localBoard.board;

import com.example.backend.dto.localBoard.board.request.CreateContentRequestDTO;
import com.example.backend.dto.localBoard.board.response.ImageResponseDTO;
import com.example.backend.entity.localBoard.LocalBoardImages;
import com.example.backend.entity.localBoard.LocalBoards;
import com.example.backend.repository.localBoard.board.LocalBoardRepository;
import com.example.backend.repository.localBoard.image.BoardImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Service
public class DetailCommandServiceImpl implements DetailCommandService {

    @Autowired
    LocalBoardRepository localBoardRepository;

    @Autowired
    BoardImageRepository boardImageRepository;

    @Override
    @Transactional
    public void createBoardDetail(CreateContentRequestDTO createContentRequestDTO){

        LocalBoards localBoards
                = LocalBoards.builder()
                .userId(createContentRequestDTO.getUserId())
                .regionCode(createContentRequestDTO.getRegionCode())
                .title(createContentRequestDTO.getTitle())
                .content(createContentRequestDTO.getContent())
                .build();

        localBoardRepository.save(localBoards);

        for(String imageUrl : createContentRequestDTO.getLocalBoardImageUrl()){

            LocalBoardImages localBoardImages
                    = LocalBoardImages.builder()
                    .localBoardId(localBoards.getLocalBoardId())
                    .localBoardImgUrl(imageUrl)
                    .build();

            boardImageRepository.save(localBoardImages);
        }
    };

    @Override
    public void updateBoardDetail(long localBoardId, CreateContentRequestDTO createContentRequestDTO){


    }
}
