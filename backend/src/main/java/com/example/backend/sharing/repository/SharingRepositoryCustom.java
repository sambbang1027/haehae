package com.example.backend.sharing.repository;

import com.example.backend.sharing.dto.request.SharingStatusRequestDTO;
import com.example.backend.sharing.dto.request.UpdateSharingRequestDTO;
import com.example.backend.sharing.dto.response.SharingListReponseDTO;

import java.util.List;

public interface SharingRepositoryCustom {
    public List<SharingListReponseDTO> getSharingList(String regionCode);

    public void updateSharingStatus(SharingStatusRequestDTO sharingStatusRequestDTO);

    public void updateSharingDetail(UpdateSharingRequestDTO updateSharingRequestDTO);
}
