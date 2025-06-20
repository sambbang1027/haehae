package com.example.backend.sharing.repository.sharingPosts;

import com.example.backend.entity.sharing.SharingPosts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SharingRepository extends JpaRepository<SharingPosts, Long>, SharingRepositoryCustom {
}
