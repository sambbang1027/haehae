package com.example.backend.reward;

import com.example.backend.dto.reward.FindRewardListDTO;
import com.example.backend.entity.reward.RewardItems;
import com.example.backend.repository.reward.RewardRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.stream.Collectors;

@SpringBootTest
public class RewardJunitTest {
    @Autowired
    private RewardRepository rewardRepository;

//    @Test
//    public void save(){
//        RewardItems rewardItems = new RewardItems();
//        RewardItems.RewardType rt = RewardItems.RewardType.DONATION;
//
//        rewardItems.setName("어린이 보호 기부");
//        rewardItems.setDescription("동서남북");
//        rewardItems.setPointCost(1000L);
//        rewardItems.setRewardType(rt);
//
//        rewardRepository.save(rewardItems);
//    }

    @Test
    public void findRewardList(){
        RewardItems.RewardType rewardItems = RewardItems.RewardType.DONATION;
        List<Object[]> resultList =rewardRepository.findRewardItemDetailsByType(rewardItems);
        List<FindRewardListDTO> dtoList = resultList.stream()
                .map(obj -> new FindRewardListDTO(
                        (Long) obj[0],       // rewardItemId
                        (String) obj[1],     // name
                        (Long) obj[2],    // pointCost
                        (String) obj[3]      // rewardItemsImgUrl
                ))
                .collect(Collectors.toList());
        dtoList.forEach(System.out::println);
    }

}
