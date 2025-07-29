package com.example.backend.reward.rewardItmeImages.service;

import com.example.backend.reward.rewardItmeImages.dto.request.RewardImagesUpdateDTO;
import com.example.backend.reward.rewardItmeImages.repository.RewardImageRepository;
import com.example.backend.reward.rewardItems.repository.RewardRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

@Service
public class RewardItemImagesServiceImpl implements RewardItemImagesService {

    private final RewardImageRepository rewardImageRepository;
    private final RewardRepository rewardRepository;
    public RewardItemImagesServiceImpl(RewardImageRepository rewardImageRepository, RewardRepository rewardRepository) {
        this.rewardImageRepository = rewardImageRepository;
        this.rewardRepository = rewardRepository;
    }
    @Transactional
    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void rewardItemImagesUpdate(List<RewardImagesUpdateDTO> dtoList) {
        for(RewardImagesUpdateDTO dto : dtoList) {
            if (!rewardRepository.existsById(dto.getRewardItemId())) {
                throw new IllegalArgumentException("해당 게시물이 존재 하지 않습니다.");
            } else if (dto.getRewardItemsImgUrl() == null || dto.getRewardItemsImgUrl().isEmpty()) {
                throw new IllegalArgumentException(" 이미지의 주소를 입력해주세요.");
            }
            try {
                rewardImageRepository.save(dto.toEntity());
            } catch (Exception ex) {
                throw new RuntimeException("이미지 업데이트 중 오류가 발생하였습니다. ");
            }
        }
    }
    @Transactional
    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void rewardItemImagesDelete(String  ids) {
        List<Long> idList = Arrays.stream(ids.split(","))
                .map(Long::parseLong)
                .toList();

        for(Long id : idList) {
            if (!rewardImageRepository.existsById(id)) {
                throw new IllegalArgumentException("해당 이미지가 존재하지 않습니다.");
            }
            try {
                rewardImageRepository.deleteById(id);
            } catch (Exception e) {
                throw new RuntimeException("이미지 삭제 중 요류가 발생하였습니다. ");
            }
        }
    }
    @Transactional
    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void rewardItemIamgeDeleteAll(long id) {
        if(!rewardRepository.existsById(id)){
            throw new IllegalArgumentException("해당 게시물이 존재하지 않습니다.");
        }
        rewardImageRepository.deleteByAll(id);
    }
}
