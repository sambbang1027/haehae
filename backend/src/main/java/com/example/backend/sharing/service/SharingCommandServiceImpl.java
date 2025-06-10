package com.example.backend.sharing.service;

import com.example.backend.entity.sharing.SharingImages;
import com.example.backend.entity.sharing.SharingPosts;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.sharing.dto.request.CreateSharingRequestDTO;
import com.example.backend.sharing.dto.request.SharingStatusRequestDTO;
import com.example.backend.sharing.dto.request.UpdateSharingRequestDTO;
import com.example.backend.sharing.repository.SharingRepository;
import com.example.backend.sharing.repository.SharingImageRepository;
import com.example.backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SharingCommandServiceImpl implements SharingCommandService {

    @Autowired
    private SharingRepository sharingRepository;

    @Autowired
    private SharingImageRepository sharingImageRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    @Override
    public void createSharingDetail(CreateSharingRequestDTO createSharingRequestDTO) {

        if (!userRepository.existsById(createSharingRequestDTO.getUserId())) {
            throw new HaehaeException(ErrorCode.USER_NOT_FOUND);
        }

        SharingPosts sharingPosts =
                SharingPosts.builder()
                        .userId(createSharingRequestDTO.getUserId())
                        .title(createSharingRequestDTO.getTitle())
                        .description(createSharingRequestDTO.getDescription())
                        .status(createSharingRequestDTO.getStatus())
                        .category(createSharingRequestDTO.getCategory())
                        .regionCode(createSharingRequestDTO.getRegionCode())
                        .build();

        SharingPosts sharingPosts1 = sharingRepository.save(sharingPosts);

        for(String image : createSharingRequestDTO.getImgUrl()){
            SharingImages sharingImages =
                    SharingImages.builder()
                            .sharingPostId(sharingPosts1.getSharingPostId())
                            .imgUrl(image)
                            .build();

            sharingImageRepository.save(sharingImages);
        }
    }

    @Override
    public void updateSharingStatus(SharingStatusRequestDTO sharingStatusRequestDTO) {
        sharingRepository.updateSharingStatus(sharingStatusRequestDTO);
    }

    @Override
    public void updateSharingDetail(UpdateSharingRequestDTO updateSharingRequestDTO) {
        sharingRepository.updateSharingDetail(updateSharingRequestDTO);
    }
}
