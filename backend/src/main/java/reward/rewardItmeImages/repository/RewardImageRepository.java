package reward.rewardItmeImages.repository;

import com.example.backend.entity.reward.RewardItemImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardImageRepository extends JpaRepository<RewardItemImages,Long>, RewardImageRepositoryCustom {
    void deleteById(long id);
}
