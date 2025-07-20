package com.example.backend.entity.localBoard;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Table(name = "comments")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private long id;

    @Column(name = "local_board_id")
    private long localBoardId;

    @Column(name = "parent_comment_id")
    private Long parentCommentId;

    @Column(name = "user_id")
    private long userId;

    private String content;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Enumerated(EnumType.STRING)
    private CommentsStatus commentsStatus;

    public enum CommentsStatus{
        ACTIVE,
        REPORT
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

}
