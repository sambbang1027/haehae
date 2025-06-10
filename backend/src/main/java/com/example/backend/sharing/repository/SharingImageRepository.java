package com.example.backend.sharing.repository;

import com.example.backend.entity.sharing.SharingImages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SharingImageRepository extends JpaRepository<SharingImages, Long>, SharingImageRepositoryCustom {
}
