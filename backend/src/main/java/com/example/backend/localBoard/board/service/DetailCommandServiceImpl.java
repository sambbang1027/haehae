package com.example.backend.localBoard.board.service;

import com.example.backend.localBoard.board.dto.request.CreateContentRequestDTO;
import com.example.backend.localBoard.board.dto.request.ImageRequestDTO;
import com.example.backend.localBoard.board.dto.request.UpdateContentRequestDTO;
import com.example.backend.entity.localBoard.LocalBoardImages;
import com.example.backend.entity.localBoard.LocalBoards;
import com.example.backend.localBoard.board.repository.LocalBoardRepository;
import com.example.backend.localBoard.image.repository.BoardImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;


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
    }

    @Override
    public void updateBoardDetail(long localBoardId, UpdateContentRequestDTO updateContentRequestDTO){
        updateContentRequestDTO.setUpdateAt(Timestamp.valueOf(LocalDateTime.now()));
        localBoardRepository.updateDetailContent(localBoardId, updateContentRequestDTO);
    }

    @Override
    public void addBoardImage(ImageRequestDTO imageRequestDTO){

        for(String imageUrl : imageRequestDTO.getLocalBoardImageUrl()){
            LocalBoardImages localBoardImages
                    =LocalBoardImages.builder()
                    .localBoardId(imageRequestDTO.getLocalBoardId())
                    .localBoardImgUrl(imageUrl)
                    .build();

            boardImageRepository.save(localBoardImages);
        }
    };

    @Override
    public void deleteBoardImage(ImageRequestDTO imageRequestDTO){
//        for(String imageUrl : imageRequestDTO.getLocalBoardImageUrl()){
//
//            boardImageRepository.deleteDetailImage(imageRequestDTO.getLocalBoardId(),imageUrl);
//
//        }
        boardImageRepository.deleteDetailImage(imageRequestDTO.getLocalBoardId(),imageRequestDTO.getLocalBoardImageUrl());
    };
}
