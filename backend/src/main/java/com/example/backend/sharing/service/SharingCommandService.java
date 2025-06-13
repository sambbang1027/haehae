package com.example.backend.sharing.service;

import com.example.backend.sharing.dto.request.CreateSharingRequestDTO;
import com.example.backend.sharing.dto.request.SharingImageRequestDTO;
import com.example.backend.sharing.dto.request.SharingStatusRequestDTO;
import com.example.backend.sharing.dto.request.UpdateSharingRequestDTO;

public interface SharingCommandService {
    public void createSharingDetail(CreateSharingRequestDTO createSharingRequestDTO);

    public void updateSharingStatus(SharingStatusRequestDTO sharingStatusRequestDTO);

    public void updateSharingDetail(UpdateSharingRequestDTO updateSharingRequestDTO);

    public void addSharingImages(SharingImageRequestDTO sharingImageRequestDTO);

    public void deleteSharingImages(SharingImageRequestDTO sharingImageRequestDTO);
}
