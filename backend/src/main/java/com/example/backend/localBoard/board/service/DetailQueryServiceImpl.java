package com.example.backend.localBoard.board.service;

import com.example.backend.localBoard.board.dto.response.ContentResponseDTO;
import com.example.backend.localBoard.board.dto.response.ImageResponseDTO;
import com.example.backend.localBoard.board.dto.response.DetailResponseDTO;
import com.example.backend.localBoard.board.repository.LocalBoardRepository;
import com.example.backend.localBoard.comment.repository.BoardCommentRepository;
import com.example.backend.localBoard.image.repository.BoardImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetailQueryServiceImpl implements DetailQueryService {

    @Autowired
    private LocalBoardRepository localBoardRepository;

    @Autowired
    private BoardImageRepository boardImageRepository;

    @Override
    public DetailResponseDTO queryBoardDetail(long localBoardId){

        ContentResponseDTO content = localBoardRepository.getLocalBoardDetailById(localBoardId);
        List<ImageResponseDTO> images = boardImageRepository.getDetailImageListById(localBoardId);

        return new DetailResponseDTO(content, images);
    };
}
