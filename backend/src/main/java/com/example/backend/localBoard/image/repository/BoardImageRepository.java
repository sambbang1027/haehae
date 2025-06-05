package com.example.backend.localBoard.image.repository;

import com.example.backend.entity.localBoard.LocalBoardImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardImageRepository extends JpaRepository<LocalBoardImages, Long>, BoardImageRepositoryCustom {

}
