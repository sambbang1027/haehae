package com.example.backend.sharing.repository.sharingPosts;

import com.example.backend.sharing.dto.request.SharingStatusRequestDTO;
import com.example.backend.sharing.dto.request.UpdateSharingRequestDTO;
import com.example.backend.sharing.dto.response.SharingCotentResponseDTO;
import com.example.backend.sharing.dto.response.SharingListReponseDTO;

import java.util.List;

public interface SharingRepositoryCustom {
    public List<SharingListReponseDTO> getSharingList(String regionCode);

    public List<SharingListReponseDTO> getSharingListByKeyword(String regionCode, String keyword);

    public void updateSharingStatus(SharingStatusRequestDTO sharingStatusRequestDTO);

    public void updateSharingDetail(UpdateSharingRequestDTO updateSharingRequestDTO);

    public SharingCotentResponseDTO getSharingDetail(Long sharingPostId);
}
