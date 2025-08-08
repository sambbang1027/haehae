package com.example.backend.myActivity.repository.sharing;

import com.example.backend.entity.sharing.SharingPosts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MySharingRepository extends JpaRepository<SharingPosts, Long> {
}
