package com.example.backend.entity.localBoard;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "local_board_images")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocalBoardImages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "local_board_image_id")
    private Long localBoardImageId;


    @Column(name = "local_board_id")
    private long localBoardId;

    @Column(name = "local_board_img_url")
    private String localBoardImgUrl;
}
