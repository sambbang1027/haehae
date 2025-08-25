package com.example.backend.entity.sharing;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Timestamp;

@Entity
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "sharing_posts")
public class SharingPosts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sharingPostId;

    @Column(name = "user_id")
    private Long userId;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "region_code")
    private String regionCode;

    @Column(name = "reserved_user_id")
    private Long reservedUserId;


    public enum Status {
        AVAILABLE, RESERVED, COMPLETED ,REPORT, CANCEL
    }

    public enum Category {
        ELECTRONICS, FURNITURE, HOUSEHOLD, CLOTHING, ETC
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    public void cancel(){
        this.status = Status.CANCEL;
    }

    public void completed(){
        this.status = Status.COMPLETED;
    }


}
