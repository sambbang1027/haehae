package com.example.backend.sharing.service;

import com.example.backend.sharing.dto.response.SharingListReponseDTO;
import com.example.backend.sharing.repository.SharingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SharingListQueryServiceImpl implements SharingListQueryService {

    @Autowired
    SharingRepository sharingRepository;

    @Override
    public List<SharingListReponseDTO> getSharingList(String regionCode) {

        List<SharingListReponseDTO> sharingList = sharingRepository.getSharingList(regionCode);

        return sharingList;
    }
}
