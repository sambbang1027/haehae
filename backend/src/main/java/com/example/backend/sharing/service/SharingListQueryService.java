package com.example.backend.sharing.service;

import com.example.backend.sharing.dto.response.SharingListReponseDTO;

import java.util.List;

public interface SharingListQueryService {
    public List<SharingListReponseDTO> getSharingList(String listName);
}
