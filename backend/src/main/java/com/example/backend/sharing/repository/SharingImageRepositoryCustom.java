package com.example.backend.sharing.repository;

import com.example.backend.sharing.dto.response.SharingImageResponseDTO;

import java.util.List;

public interface SharingImageRepositoryCustom {

    public List<SharingImageResponseDTO> getSharingImagesById(Long sharingPostId);
}
