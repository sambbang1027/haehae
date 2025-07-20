package com.example.backend.sharing.repository.sharingPosts;

import com.example.backend.entity.sharing.SharingPosts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SharingRepository extends JpaRepository<SharingPosts, Long>, SharingRepositoryCustom {

    @Query("SELECT s.userId FROM SharingPosts s " +
            " WHERE s.sharingPostId =:sharingPostId ")
    Long findSharingPostUserId(@Param("sharingPostId")Long sharingPostId);
}
