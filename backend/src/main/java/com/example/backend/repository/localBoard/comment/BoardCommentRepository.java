package com.example.backend.repository.localBoard.comment;

import com.example.backend.entity.localBoard.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardCommentRepository extends JpaRepository<Comments, Long>, BoardCommentRepositoryCustom {

}
