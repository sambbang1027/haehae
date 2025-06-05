package reward.rewardItems.repository;



import com.example.backend.entity.reward.RewardItems;
import org.springframework.data.repository.query.Param;
import reward.rewardItems.dto.response.FindRewardDetailDTO;
import reward.rewardItems.dto.response.FindRewardListDTO;

import java.util.List;

public interface RewardRepositoryCustom {
    List<FindRewardListDTO> findRewardList(@Param("rewardType")RewardItems.RewardType rewardType);
    FindRewardDetailDTO findRewardDetailById(@Param("id") long id);

}
