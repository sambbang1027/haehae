package com.example.backend.user.service;


import com.example.backend.entity.user.UserLevel;
import com.example.backend.user.dto.TotalAndLevelDTO;
import com.example.backend.user.dto.UserInfoAndNextLevelInfoDTO;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.userLevel.repsoitory.UserLevelRepository;
import org.springframework.stereotype.Service;

@Service
public class UserInfoServiceImpl implements UserInfoService{

    private final UserRepository userRepository;
    private final UserLevelRepository userLevelRepository;

    public UserInfoServiceImpl(UserRepository userRepository, UserLevelRepository userLevelRepository) {
        this.userRepository = userRepository;
        this.userLevelRepository = userLevelRepository;
    }

    // 유저의 현재포인트, 총 포인트 ,유저 등급 , 다음 등급 정보
    // 미션 페이지에서 유저의 정보를 한번에 전달.
    @Override
    public UserInfoAndNextLevelInfoDTO findCurrentAndTotalPointByUserId(long id) {
       TotalAndLevelDTO dto = userRepository.findUserLevelAndPoint(id);
       if(dto == null){
           throw new IllegalArgumentException("유저의 정보가 없습니다.");
       }
      UserLevel level = userLevelRepository.findUserNextLevels(dto.getUserLevelId()+1);
       if(level == null){
           throw new IllegalArgumentException("등급 정보가 없습니다.");
       }
        UserInfoAndNextLevelInfoDTO userInfoAndNextLevelInfoDTO = new UserInfoAndNextLevelInfoDTO(
                dto,
                level
        );

        return userInfoAndNextLevelInfoDTO;
    }
}
