package com.example.backend.sharing.service;

import com.example.backend.sharing.dto.response.SharingDetailResponseDTO;
import com.example.backend.sharing.dto.response.SharingImageResponseDTO;

import java.util.List;

public interface SharingQueryService{
    public SharingDetailResponseDTO getSharingDetail(Long sharingPostId);

    public List<SharingImageResponseDTO> getSharingImages(Long sharingPostId);
}
