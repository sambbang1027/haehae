package com.example.backend.reward.rewardItems.service;


import com.example.backend.exception.RewardException;
import com.example.backend.pagination.response.CursorPageResponse;
import com.example.backend.reward.rewardItems.dto.request.RewardItemsRequestUpdateDTO;
import com.example.backend.reward.rewardItems.dto.request.RewardRequestDTO;
import com.example.backend.reward.rewardItems.dto.response.FindRewardDetailDTO;
import com.example.backend.reward.rewardItems.dto.response.FindRewardListDTO;
import com.example.backend.entity.reward.RewardItemImages;
import com.example.backend.entity.reward.RewardItems;
import com.example.backend.reward.rewardItmeImages.repository.RewardImageRepository;
import com.example.backend.reward.rewardItems.repository.RewardRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void rewardItemInsert(RewardRequestDTO dto) {
        if(dto.getRewardType() != RewardItems.RewardType.DONATION){
            if(dto.getStock()<=0){
                throw new RewardException("상품의 갯수를 입력해주세요.");
            } else if (dto.getPointCost()<=0) {
                throw new RewardException("포인트 가격을 입력해주세요.");
            }
        }else{
            dto.setPointCost(0);
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
    public CursorPageResponse<FindRewardListDTO> findRewardItemList(RewardItems.RewardType rewardType, Long cursor, int limit) {
        if(rewardType == null){
             rewardType = RewardItems.RewardType.DONATION;
        }

        int limitPlusOne = limit + 1;
        List<FindRewardListDTO> list = rewardRepository.findRewardList(rewardType, cursor, limitPlusOne);

        boolean hasNext = list.size() > limit;

        if (hasNext) {
            list.remove(limit);  // 초과 1개 제거
        }

        Long nextCursor = hasNext ? list.get(list.size() - 1).getId() : null;
        return new CursorPageResponse<>(list, nextCursor, hasNext);
    }

    @Override
    public FindRewardDetailDTO findRewardDetail(long id) {
        FindRewardDetailDTO dto = rewardRepository.findRewardDetailById(id);
        if(dto == null){
            throw new RewardException("조회한 게시물의 정보가 없습니다.");
        }
        return dto;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void rewardItemUpdate(RewardItemsRequestUpdateDTO dto) {

        if(dto.getRewardType() != RewardItems.RewardType.DONATION) {
            if (dto.getStock() < 0) {
                throw new RewardException("DONATION을 제외한 리워드 상품의 재고는 음수 일 수 없습니다.");
            }
        }
        RewardItems rewardItems= rewardRepository.findById(dto.getId())
                        .orElseThrow(() -> new RewardException("해당 게시물의 정보가 없습니다. "));

        rewardRepository.save(dto.toEntity());
    }

    @Transactional
    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void rewardDeleteById(long id) {
        if(!rewardRepository.existsById(id)){
            throw new RewardException("해당 게시물의 정보가 없습니다.");
        }
        rewardImageRepository.deleteByAll(id);
        rewardRepository.deleteById(id);
    }
}
