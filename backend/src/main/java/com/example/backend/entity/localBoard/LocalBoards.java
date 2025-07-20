package com.example.backend.entity.localBoard;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;



@Entity
@Table(name = "local_boards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocalBoards {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "local_board_id")
    private long localBoardId;

    @Column(name = "user_id")
    private long userId;

    private String title;

    private String content;

    @Column(name = "region_code")
    private String regionCode;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Enumerated(EnumType.STRING)
    private BoardStatus boardStatus;

    public enum BoardStatus{
        ACTIVE,
        REPORT
    }


    @PrePersist
    public void prePersist() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = new Timestamp(System.currentTimeMillis());
    }
}
