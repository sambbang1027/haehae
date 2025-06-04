package com.example.backend.service.localBoard.board;

import com.example.backend.dto.localBoard.board.response.ContentResponseDTO;
import com.example.backend.dto.localBoard.board.response.ImageResponseDTO;
import com.example.backend.dto.localBoard.board.response.DetailResponseDTO;
import com.example.backend.repository.localBoard.board.LocalBoardRepository;
import com.example.backend.repository.localBoard.comment.BoardCommentRepository;
import com.example.backend.repository.localBoard.image.BoardImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetailQueryServiceImpl implements DetailQueryService {

    @Autowired
    private LocalBoardRepository localBoardRepository;

    @Autowired
    private BoardCommentRepository boardCommentRepository;

    @Autowired
    private BoardImageRepository boardImageRepository;

    @Override
    public DetailResponseDTO getBoardDetail(long localBoardId){

        ContentResponseDTO content = localBoardRepository.getLocalBoardDetailById(localBoardId);
        List<ImageResponseDTO> images = boardImageRepository.getLocalBoardDetailImageById(localBoardId);
//        List<CommentResponseDTO> flatComments = boardCommentRepository.getLocalBoardDetailCommentById(localBoardId);

//        List<CommentResponseDTO> comments = commentTree(flatComments);

        return new DetailResponseDTO(content, images);
    };

//    @Override
//    public List<CommentResponseDTO> commentTree(List<CommentResponseDTO> flatComments){
//
//        List<CommentResponseDTO> returnComments = new ArrayList<>();
//        Map<Long, CommentResponseDTO> commentMap = new HashMap<>();
//
//        for( CommentResponseDTO comment : flatComments ){
//            commentMap.put(comment.getCommentId(), comment);
//        }
//
//        for( CommentResponseDTO comment : flatComments ){
//            if(comment.getParentCommentId() == null){
//                returnComments.add(comment);
//            } else {
//                CommentResponseDTO parentComment = commentMap.get(comment.getParentCommentId());
//                if(parentComment != null){
//                    parentComment.getReplies().add(comment);
//                }
//            }
//        }
//
//        return returnComments;
//    };
}
