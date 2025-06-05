package reward.rewardItmeImages.repository;

import com.example.backend.entity.reward.QRewardItemImages;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

@Repository
public class RewardImageRepositoryImpl implements RewardImageRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    public RewardImageRepositoryImpl(JPAQueryFactory queryFactory) {
        this.jpaQueryFactory = queryFactory;
    }

    QRewardItemImages qri = QRewardItemImages.rewardItemImages;

    @Override
    public void deleteByAll(Long id) {
         jpaQueryFactory
                .delete(qri)
                .where(qri.rewardItemId.eq(id))
                .execute();
    }
}
