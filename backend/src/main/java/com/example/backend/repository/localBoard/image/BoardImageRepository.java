package com.example.backend.repository.localBoard.image;

import com.example.backend.entity.localBoard.LocalBoardImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardImageRepository extends JpaRepository<LocalBoardImages, Long>, BoardImageRepositoryCustom {

}
