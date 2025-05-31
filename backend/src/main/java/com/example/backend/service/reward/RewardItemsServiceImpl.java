package com.example.backend.service.reward;

import com.example.backend.dto.reward.FindRewardDetailDTO;
import com.example.backend.dto.reward.FindRewardListDTO;
import com.example.backend.dto.reward.RewardRequestDTO;
import com.example.backend.entity.reward.RewardItemImages;
import com.example.backend.entity.reward.RewardItems;
import com.example.backend.repository.reward.RewardImageRepository;
import com.example.backend.repository.reward.RewardRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RewardItemsServiceImpl implements RewardItemsService {
    private final RewardRepository rewardRepository;
    private final RewardImageRepository rewardImageRepository;

    public RewardItemsServiceImpl(RewardRepository rewardRepository, RewardImageRepository rewardImageRepository) {
        this.rewardRepository = rewardRepository;
        this.rewardImageRepository = rewardImageRepository;
    }


    @Transactional
    public void RewardItemInsert(RewardRequestDTO dto) {
        if (dto == null) {
            throw new IllegalArgumentException("리워드 상점 게시물을 작성해주세요.");
        }
        RewardItems item = rewardRepository.save(dto.toRewardItemsEntity());

        List<String> imageUrls = dto.getRewardItemsImgUrl();

            if (imageUrls != null && !imageUrls.isEmpty()) {
                for (String iamgeUrl : dto.getRewardItemsImgUrl()) {
                    RewardItemImages image = RewardItemImages.builder()
                            .rewardItemId(item.getId())
                            .rewardItemsImgUrl(iamgeUrl)
                            .build();
                    rewardImageRepository.save(image);
                }
            }
    }

    @Override
    public List<FindRewardListDTO> findRewardItemList(RewardItems.RewardType rewardType) {
        if(rewardType == null){
             rewardType = RewardItems.RewardType.DONATION;
        }
        return rewardRepository.findRewardList(rewardType);
    }

    @Override
    public FindRewardDetailDTO findRewardDetail(long id) {
        FindRewardDetailDTO dto = rewardRepository.findRewardDetailById(id);
        if(dto == null){
            throw new IllegalArgumentException("조회한 게시물의 정보가 없습니다.");
        }
        return dto;
    }
}
