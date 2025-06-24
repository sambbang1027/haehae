package com.example.backend.sharing.service;

import com.example.backend.sharing.dto.response.SharingListReponseDTO;
import com.example.backend.sharing.repository.sharingPosts.SharingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SharingListQueryServiceImpl implements SharingListQueryService {

    @Autowired
    SharingRepository sharingRepository;

    @Override
    public List<SharingListReponseDTO> getSharingList(String regionCode, String keyword) {

        List<SharingListReponseDTO> sharingList = new ArrayList<>();

        if (keyword != null && !keyword.isBlank()){
            sharingList = sharingRepository.getSharingListByKeyword(regionCode, keyword);
        } else {
            sharingList = sharingRepository.getSharingList(regionCode);
        }

        return sharingList;
    }
}
