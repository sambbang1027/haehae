package com.example.backend.sharing.service;

import com.example.backend.sharing.dto.response.SharingDetailResponseDTO;
import com.example.backend.sharing.dto.response.SharingImageResponseDTO;
import com.example.backend.sharing.repository.SharingImageRepository;
import com.example.backend.sharing.repository.SharingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SharingQueryServiceImpl implements SharingQueryService {

    @Autowired
    private SharingRepository sharingRepository;

    @Autowired
    private SharingImageRepository sharingImageRepository;

    public SharingDetailResponseDTO getSharingDetail(Long sharingPostId){

        SharingDetailResponseDTO sharingDetail;
        sharingDetail = sharingRepository.getSharingDetail(sharingPostId);

        return sharingDetail;
    }

    public List<SharingImageResponseDTO> getSharingImages(Long sharingPostId){
        List<SharingImageResponseDTO> sharingImages;
        sharingImages = sharingImageRepository.getSharingImagesById(sharingPostId);

        return sharingImages;
    }
}
