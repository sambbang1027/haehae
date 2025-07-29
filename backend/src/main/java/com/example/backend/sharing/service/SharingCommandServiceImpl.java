package com.example.backend.sharing.service;

import com.example.backend.entity.sharing.SharingImages;
import com.example.backend.entity.sharing.SharingPosts;
import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.exception.PenaltyException;
import com.example.backend.sharing.dto.request.CreateSharingRequestDTO;
import com.example.backend.sharing.dto.request.SharingImageRequestDTO;
import com.example.backend.sharing.dto.request.SharingStatusRequestDTO;
import com.example.backend.sharing.dto.request.UpdateSharingRequestDTO;
import com.example.backend.sharing.repository.sharingPosts.SharingRepository;
import com.example.backend.sharing.repository.images.SharingImageRepository;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.userPenalty.service.UserPenaltyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SharingCommandServiceImpl implements SharingCommandService {

    private final UserPenaltyService userPenaltyService;

    @Autowired
    private SharingRepository sharingRepository;

    @Autowired
    private SharingImageRepository sharingImageRepository;

    @Autowired
    private UserRepository userRepository;

    public SharingCommandServiceImpl(UserPenaltyService userPenaltyService) {
        this.userPenaltyService = userPenaltyService;
    }

    @Transactional
    @Override
    public void createSharingDetail(CreateSharingRequestDTO createSharingRequestDTO) {

        // 유저의 패널티 적용 기간.
        String penaltyTime =  userPenaltyService.existEndAtUserId(createSharingRequestDTO.getUserId());
        if(penaltyTime != null){
            throw new PenaltyException("정지 남은 시간 : " +penaltyTime);
        }

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

        for (String image : createSharingRequestDTO.getImgUrl()) {
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

        // 유저의 패널티 적용 기간.
        String penaltyTime =  userPenaltyService.existEndAtUserId(updateSharingRequestDTO.getUserId());
        if(penaltyTime != null){
            throw new PenaltyException("정지 남은 시간 : " +penaltyTime);
        }

        sharingRepository.updateSharingDetail(updateSharingRequestDTO);
    }

    @Override
    public void addSharingImages(SharingImageRequestDTO sharingImageRequestDTO) {
        for (String imgUrl : sharingImageRequestDTO.getImgUrl()) {
            SharingImages sharingImages = SharingImages.builder()
                    .sharingPostId(sharingImageRequestDTO.getSharingPostId())
                    .imgUrl(imgUrl)
                    .build();

            sharingImageRepository.save(sharingImages);
        }
    }

    @Override
    public void deleteSharingImages(SharingImageRequestDTO sharingImageRequestDTO) {
//        for(String imgUrl : sharingImageRequestDTO.getImgUrl()){}
        for (Long sharingImageId: sharingImageRequestDTO.getSharingImageId()) {
            sharingImageRepository.deleteById(sharingImageId);
        }
    }
}
