package com.example.backend.mission.userMissionStatus.service;

import com.example.backend.entity.mission.PreviewMissions;
import com.example.backend.entity.mission.UserMissionStatus;
import com.example.backend.entity.reward.RewardItems;
import com.example.backend.entity.user.UserPoint;
import com.example.backend.localBoard.board.repository.LocalBoardRepository;
import com.example.backend.localBoard.comment.repository.BoardCommentRepository;
import com.example.backend.mission.previewMissions.dto.response.PreviewMissionListResponseDTO;
import com.example.backend.mission.previewMissions.service.PreviewMissionService;
import com.example.backend.mission.userMissionStatus.dto.request.UserMissionStatusInsertRequestDTO;
import com.example.backend.mission.userMissionStatus.dto.request.UserMissionStatusUpdateRequestDTO;
import com.example.backend.mission.userMissionStatus.dto.response.UserMissionStatusCheckResponseDTO;
import com.example.backend.mission.userMissionStatus.repository.UserMissionStatusRepository;
import com.example.backend.mission.userMissions.dto.UserMissionInsertRequestDTO;
import com.example.backend.mission.userMissions.repository.UserMissionRepository;
import com.example.backend.reward.userReward.repository.UserRewardRepository;
import com.example.backend.user.dto.UserCurrentAndTotalPointResponseDTO;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.userPoint.dto.request.UserMissionSuccessRequestDTO;
import com.example.backend.userPoint.repository.UserPointRepository;
import jakarta.transaction.Transactional;
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
    private final UserRepository userRepository;
    private final UserPointRepository userPointRepository;
    private final UserMissionRepository userMissionRepository;

    public UserMissionStatusServiceImpl(UserMissionStatusRepository userMissionStatusRepository, PreviewMissionService previewMissionService, LocalBoardRepository localBoardRepository, UserRewardRepository userRewardRepository, BoardCommentRepository boardCommentRepository, UserRepository userRepository, UserPointRepository userPointRepository, UserMissionRepository userMissionRepository) {
        this.userMissionStatusRepository = userMissionStatusRepository;
        this.previewMissionService = previewMissionService;
        this.localBoardRepository = localBoardRepository;
        this.userRewardRepository = userRewardRepository;
        this.boardCommentRepository = boardCommentRepository;
        this.userRepository = userRepository;
        this.userPointRepository = userPointRepository;
        this.userMissionRepository = userMissionRepository;
    }
    
    // PreviewMission 유저의 상태 확인
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

            UserMissionStatus missionStatus = userMissionStatusRepository.findByPreviewMissionId(id, userId);

            switch (category) {
                // 봉사활동 기록 조회
                case VOLUNTEER:

                    break;

                // 지역 게시판 작성 조회
                case POST:
                  Long countBoard = localBoardRepository.countLocalBoardCheckMission(userId,startAt,endAt);
                    UserMissionStatus.MissionStatus resultStatusBoard =
                            (countBoard<countNum)
                                    ? UserMissionStatus.MissionStatus.PREVIEW
                                    : UserMissionStatus.MissionStatus.ACCEPTED;
                    uploadAndInsertMissionStatus(userId,id,resultStatusBoard,missionStatus);
                    break;

                // 댓글 개수 조회    
                case COMMENT:
                  Long countComment = boardCommentRepository.countCommentMission(userId, startAt, endAt);
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
                    Long countReward;
                    if(mission.getPreviewMissionContent().contains("기부")){
                        countReward = userRewardRepository.countUserReward(userId, startAt, endAt, RewardItems.RewardType.DONATION);
                    }else if(mission.getPreviewMissionContent().contains("상품권")){
                        countReward = userRewardRepository.countUserReward(userId, startAt, endAt, RewardItems.RewardType.VOUCHER);
                    } else if (mission.getPreviewMissionContent().contains("기프티콘") || mission.getPreviewMissionContent().contains("쿠폰")) {
                        countReward = userRewardRepository.countUserReward(userId, startAt, endAt, RewardItems.RewardType.GIFTICON);
                    }else {
                        countReward = userRewardRepository.countUserReward(userId, startAt, endAt,null);
                    }


                    UserMissionStatus.MissionStatus resultStatusReward =
                            (countReward<countNum)
                                ? UserMissionStatus.MissionStatus.PREVIEW
                                : UserMissionStatus.MissionStatus.ACCEPTED;

                    uploadAndInsertMissionStatus(userId, id, resultStatusReward, missionStatus);
                    break;

                // 미션 달성 상태 확인
                case MISSION:
                    Long countMission =  userMissionRepository.countUserMission(userId,startAt,endAt);
                    UserMissionStatus.MissionStatus resultStatusMission =
                            (countMission<countNum)
                                    ? UserMissionStatus.MissionStatus.PREVIEW
                                    : UserMissionStatus.MissionStatus.ACCEPTED;
                    uploadAndInsertMissionStatus(userId, id, resultStatusMission, missionStatus);

                    break;
            }
        }
    }

    // 미션 성공 시 동작하는 메서드
    // 1. 유저 미션 상태 변경 ACCEPTED -> COMPLETED
    // 2. 유저 포인트 삽입
    // 3. 유저 미션 십입.
    // 4. 현재 포인트 반영. 
    @Transactional
    @Override
    public void completeUpdateUserStatus(UserMissionSuccessRequestDTO dto) {

        if(dto == null){
            throw new IllegalArgumentException("dto의 값이 없음.");
        }
        // 미션 상태.
        UserMissionStatusCheckResponseDTO checkStatus = userMissionStatusRepository.checkStatusComplete(dto.getUserMissionId());

        // 미션 상태 체크
        if(checkStatus.getMissionStatus() != UserMissionStatus.MissionStatus.COMPLETED && checkStatus.getMissionStatus() != UserMissionStatus.MissionStatus.EXPIRED){

            // 1. 미션 상태 업데이트 ACCEPTED -> COMPLETED
            userMissionStatusRepository.userStatusUpdate(dto.getUserMissionId(), UserMissionStatus.MissionStatus.COMPLETED);

            // 2. 유저 포인트 삽입.
            UserPoint userPoint =  userPointRepository.save(dto.toEntity());

            // 3. 유저 미션 삽입.
            UserMissionInsertRequestDTO requestDTO = new UserMissionInsertRequestDTO(userPoint.getId(), dto.getUserMissionId());
            userMissionRepository.save(requestDTO.toEntity());

            // 4. 유저 포인트 반영.(current , total 포인트)
            UserCurrentAndTotalPointResponseDTO currentAndTotalPoint =  userRepository.findCurrentAndTotalPointByUserId(dto.getUserId());
            if(currentAndTotalPoint.getCurrentPoint() == null){
                currentAndTotalPoint.setCurrentPoint(0l);
            }

            if(currentAndTotalPoint.getTotalPoint() == null){
                currentAndTotalPoint.setTotalPoint(0l);
            }

            long plusPoint = currentAndTotalPoint.getCurrentPoint() + dto.getAmount();
            long totalPlusPoint = currentAndTotalPoint.getTotalPoint() + dto.getAmount();
            userRepository.updateCurrentPoint(plusPoint, dto.getUserId());
            userRepository.updateTotalPoint(totalPlusPoint, dto.getUserId());
        }
    }


    private void uploadAndInsertMissionStatus(
                                                Long userId,
                                                Long previewMissionId,
                                                UserMissionStatus.MissionStatus status,
                                                UserMissionStatus missionStatus
                                                ){
        if (missionStatus == null) {
            UserMissionStatusInsertRequestDTO dto = new UserMissionStatusInsertRequestDTO(
                    status, userId, previewMissionId
            );
            userMissionStatusRepository.save(dto.toUserMissionStatusEntity());

        }else if(missionStatus.getMissionStatus() == UserMissionStatus.MissionStatus.PREVIEW){
            UserMissionStatusUpdateRequestDTO dto = new UserMissionStatusUpdateRequestDTO(
                    missionStatus.getId(), status, userId, previewMissionId
            );
            userMissionStatusRepository.save(dto.toUserMissionStatusUpdateEntity());
        }

    }
}
