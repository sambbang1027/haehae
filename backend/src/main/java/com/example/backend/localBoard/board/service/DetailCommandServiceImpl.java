package com.example.backend.localBoard.board.service;

import com.example.backend.exception.PenaltyException;
import com.example.backend.localBoard.board.dto.request.CreateContentRequestDTO;
import com.example.backend.localBoard.board.dto.request.ImageRequestDTO;
import com.example.backend.localBoard.board.dto.request.UpdateContentRequestDTO;
import com.example.backend.entity.localBoard.LocalBoardImages;
import com.example.backend.entity.localBoard.LocalBoards;
import com.example.backend.localBoard.board.repository.LocalBoardRepository;
import com.example.backend.localBoard.image.repository.BoardImageRepository;
import com.example.backend.userPenalty.service.UserPenaltyService;
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


    private final UserPenaltyService userPenaltyService;


    public DetailCommandServiceImpl(UserPenaltyService userPenaltyService) {
        this.userPenaltyService = userPenaltyService;
    }

    @Override
    @Transactional
    public void createDetail(CreateContentRequestDTO createContentRequestDTO){
      // 유저의 패널티 적용 기간.
      String penaltyTime =  userPenaltyService.existEndAtUserId(createContentRequestDTO.getUserId());
      if(penaltyTime != null){
        throw new PenaltyException("정지 남은 시간 : " +penaltyTime);
      }


        LocalBoards localBoards
                = LocalBoards.builder()
                .userId(createContentRequestDTO.getUserId())
                .regionCode(createContentRequestDTO.getRegionCode())
                .title(createContentRequestDTO.getTitle())
                .content(createContentRequestDTO.getContent())
                .build();

        localBoardRepository.save(localBoards);

        if(createContentRequestDTO.getLocalBoardImageUrl() != null) {
            for (String imageUrl : createContentRequestDTO.getLocalBoardImageUrl()) {

                LocalBoardImages localBoardImages
                        = LocalBoardImages.builder()
                        .localBoardId(localBoards.getLocalBoardId())
                        .localBoardImgUrl(imageUrl)
                        .build();

                boardImageRepository.save(localBoardImages);
            }
        }
    }

    @Override
    public void updateDetail(long localBoardId, UpdateContentRequestDTO updateContentRequestDTO){
        // 유저의 패널티 적용 기간.
        String penaltyTime =  userPenaltyService.existEndAtUserId(updateContentRequestDTO.getUserId());
        if(penaltyTime != null){
            throw new PenaltyException("정지 남은 시간 : " +penaltyTime);
        }

        updateContentRequestDTO.setUpdateAt(Timestamp.valueOf(LocalDateTime.now()));
        localBoardRepository.updateDetailContent(localBoardId, updateContentRequestDTO);
    }

    @Override
    public void addDetailImage(ImageRequestDTO imageRequestDTO){

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
    public void deleteDetailImage(ImageRequestDTO imageRequestDTO){
//        for(String imageUrl : imageRequestDTO.getLocalBoardImageUrl()){
//
//            boardImageRepository.deleteDetailImage(imageRequestDTO.getLocalBoardId(),imageUrl);
//
//        }
        boardImageRepository.deleteDetailImage(imageRequestDTO.getLocalBoardId(),imageRequestDTO.getLocalBoardImageUrl());
    };
}
