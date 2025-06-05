package reward.rewardItems.dto.request;

import com.example.backend.entity.reward.RewardItems;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RewardRequestDTO {
    @NotBlank
    private String name;

    @NotNull
    private String description;

    private long PointCost;
    private long stock;
    private RewardItems.RewardType rewardType;

    @NotBlank
    private String organization;

    private List<String> rewardItemsImgUrl;

    public RewardItems toRewardItemsEntity(){
        return RewardItems.builder()
                .name(name)
                .description(description)
                .pointCost(PointCost)
                .stock(stock)
                .rewardType(rewardType)
                .organization(organization)
                .build();
    }

}
