package reward.rewardItmeImages.service;


import reward.rewardItmeImages.dto.request.RewardImagesUpdateDTO;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RewardItemImagesService {
    void rewardItemImagesUpdate(List<RewardImagesUpdateDTO> dto);
    void rewardItemImagesDelete(@Param("id") List<Long> id);
    void rewardItemIamgeDeleteAll(@Param("id") long id);

}
