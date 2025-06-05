package reward.userReward.repository;

import reward.userReward.dto.response.UserRewardRecodeDTO;
import org.springframework.data.repository.query.Param;

public interface UserRewardRepositoryCustom {
    UserRewardRecodeDTO findUserRewardById(@Param("id") long id);
}
