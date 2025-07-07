package com.example.backend.mission.userMissionStatus.service;

import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.entity.mission.UserMissionStatus;
import com.example.backend.entity.reward.RewardItems;
import com.example.backend.localBoard.board.repository.LocalBoardRepository;
import com.example.backend.localBoard.comment.repository.BoardCommentRepository;
import com.example.backend.mission.previewMissions.dto.response.PreviewMissionListResponseDTO;
import com.example.backend.mission.previewMissions.service.PreviewMissionService;
import com.example.backend.mission.userMissionStatus.dto.request.UserMissionStatusInsertRequestDTO;
import com.example.backend.mission.userMissionStatus.dto.request.UserMissionStatusUpdateRequestDTO;
import com.example.backend.mission.userMissionStatus.repository.UserMissionStatusRepository;
import com.example.backend.reward.userReward.repository.UserRewardRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class UserMissionStatusServiceImpl implements UserMissionStatusService{

    private final UserMissionStatusRepository userMissionStatusRepository;
    private final PreviewMissionService previewMissionService;

    private final LocalBoardRepository localBoardRepository;
    private final UserRewardRepository userRewardRepository;
    private final BoardCommentRepository boardCommentRepository;

    public UserMissionStatusServiceImpl(UserMissionStatusRepository userMissionStatusRepository, PreviewMissionService previewMissionService, LocalBoardRepository localBoardRepository, UserRewardRepository userRewardRepository, BoardCommentRepository boardCommentRepository) {
        this.userMissionStatusRepository = userMissionStatusRepository;
        this.previewMissionService = previewMissionService;
        this.localBoardRepository = localBoardRepository;
        this.userRewardRepository = userRewardRepository;
        this.boardCommentRepository = boardCommentRepository;
    }

    @Override
    public void checkStatusUpdate(Long userId){
        List<PreviewMissionListResponseDTO> missinList =  previewMissionService.findPreviewALlActive();

        for(PreviewMissionListResponseDTO mission : missinList){
            PreviewMissions.PreviewMissionCategory category = mission.getPreviewMissionCategory();
            PreviewMissions.PreviewMissionType type =  mission.getPreviewMissionType();
            Long id = mission.getId();
            Timestamp startAt = mission.getStartAt();
            Timestamp endAt = mission.getEndAt();
            Long countNum = mission.getQuantityCondition();
            System.out.println(startAt);
            System.out.println(endAt);

            UserMissionStatus missionStatus = userMissionStatusRepository.findByPreviewMissionId(id, userId);

            switch (category) {
                // 봉사활동 기록 조회
                case VOLUNTEER:

                    break;

                // 지역 게시판 작성 조회
                case POST:
                  Long countBoard =  localBoardRepository.countLocalBoardCheckMission(userId,startAt,endAt);
                    System.out.println("지역 게시판 조건 : "+countNum);
                    UserMissionStatus.MissionStatus resultStatusBoard =
                            (countBoard<countNum)
                                    ? UserMissionStatus.MissionStatus.PREVIEW
                                    : UserMissionStatus.MissionStatus.ACCEPTED;
                    uploadAndInsertMissionStatus(userId,id,resultStatusBoard,missionStatus);
                    System.out.println("지역 게시판 조회 : "+countBoard);
                    break;

                // 댓글 개수 조회    
                case COMMENT: 
                    System.out.println("댓글 조건 : "+countNum);
                  Long countComment=  boardCommentRepository.countCommentMission(userId, startAt, endAt);
                    System.out.println("댓글 조회 : "+ countComment );
                    UserMissionStatus.MissionStatus resultStatusComment =
                            (countComment<countNum)
                                    ? UserMissionStatus.MissionStatus.PREVIEW
                                    : UserMissionStatus.MissionStatus.ACCEPTED;
                  uploadAndInsertMissionStatus(userId,id,resultStatusComment,missionStatus);
                    break;

                // 나눔 완료 조회
                case SHARING:
                    
                    break;

                 // 리워드 결제 상태 확인
                case REWARD:
                    System.out.println("리워드 조건 : "+countNum);
                    Long countReward;
                    if(mission.getPreviewMissionContent().contains("기부")){
                        System.out.println("기부 조회 1");
                        countReward = userRewardRepository.countUserReward(userId, startAt, endAt, RewardItems.RewardType.DONATION);
                    }else if(mission.getPreviewMissionContent().contains("상품권")){
                        System.out.println("상품권 조회 1");
                        countReward = userRewardRepository.countUserReward(userId, startAt, endAt, RewardItems.RewardType.VOUCHER);
                    } else if (mission.getPreviewMissionContent().contains("기프티콘") || mission.getPreviewMissionContent().contains("쿠폰")) {
                        System.out.println("기프티콘 조회 1");
                        countReward = userRewardRepository.countUserReward(userId, startAt, endAt, RewardItems.RewardType.GIFTICON);
                    }else {
                        System.out.println("그냥 조회 1");
                        countReward = userRewardRepository.countUserReward(userId, startAt, endAt,null);
                    }

                    System.out.println("리워드 조회 : "+ countReward );

                    UserMissionStatus.MissionStatus resultStatusReward =
                            (countReward<countNum)
                                ? UserMissionStatus.MissionStatus.PREVIEW
                                : UserMissionStatus.MissionStatus.ACCEPTED;

                    uploadAndInsertMissionStatus(userId, id, resultStatusReward, missionStatus);
                    break;

                // 미션 달성 상태 확인
                case MISSION:

                    break;
            }
        }
    }


    private void uploadAndInsertMissionStatus(
                                                Long userId,
                                                Long previewMissionId,
                                                UserMissionStatus.MissionStatus status,
                                                UserMissionStatus missionStatus
                                                ){
        if (missionStatus == null) {
            UserMissionStatusInsertRequestDTO dto = new UserMissionStatusInsertRequestDTO();
            dto.setUserId(userId);
            dto.setPreviewMissionId(previewMissionId);
            dto.setStatus(status);
            userMissionStatusRepository.save(dto.toUserMissionStatusEntity());

        }else if(missionStatus.getMissionStatus() == UserMissionStatus.MissionStatus.PREVIEW){
            UserMissionStatusUpdateRequestDTO dto = new UserMissionStatusUpdateRequestDTO();
            dto.setUserId(userId);
            dto.setPreviewMissionId(previewMissionId);
            dto.setId(missionStatus.getId());
            dto.setStatus(status);
            userMissionStatusRepository.save(dto.toUserMissionStatusUpdateEntity());
        }

    }
}
