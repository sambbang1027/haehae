package com.example.backend.userPenalty.service;

import com.example.backend.chat.repository.ChatMessageRepository;
import com.example.backend.entity.localBoard.Comments;
import com.example.backend.entity.localBoard.LocalBoards;
import com.example.backend.entity.report.Report;
import com.example.backend.entity.report.UserPenalty;
import com.example.backend.entity.sharing.SharingPosts;
import com.example.backend.entity.user.User;
import com.example.backend.localBoard.board.repository.LocalBoardRepository;
import com.example.backend.localBoard.comment.repository.BoardCommentRepository;
import com.example.backend.report.dto.response.UpdateReportInfoDTO;
import com.example.backend.report.service.ReportService;
import com.example.backend.sharing.dto.request.SharingStatusRequestDTO;
import com.example.backend.sharing.repository.sharingPosts.SharingRepository;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.userPenalty.dto.FrontUserPenaltyRequestDTO;
import com.example.backend.userPenalty.dto.UserPenaltyInsertRequestDTO;
import com.example.backend.userPenalty.repository.UserPenaltyRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class UserPenaltyServiceImpl implements UserPenaltyService{

    private final UserPenaltyRepository userPenaltyRepository;
    private final ReportService reportService;
    private final LocalBoardRepository localBoardRepository;
    private final BoardCommentRepository boardCommentRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final SharingRepository sharingRepository;
    private final UserRepository userRepository;

    public UserPenaltyServiceImpl(UserPenaltyRepository userPenaltyRepository, ReportService reportService, LocalBoardRepository localBoardRepository, BoardCommentRepository boardCommentRepository, ChatMessageRepository chatMessageRepository, SharingRepository sharingRepository, UserRepository userRepository) {
        this.userPenaltyRepository = userPenaltyRepository;
        this.reportService = reportService;
        this.localBoardRepository = localBoardRepository;
        this.boardCommentRepository = boardCommentRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.sharingRepository = sharingRepository;
        this.userRepository = userRepository;
    }


    // 관리자의 신고처리 로직.
    // 1. reportId로 해당 Report의 status 업데이트
    // 2. 해당 타겟 ID와 타켓타입으로 유저 아이디 조회
    // 3. 해당 게시물 또는 댓글 상태 변경 -> 조회 못하게 상태 변경.
    // 4. 해당 유저의 대한 제제하기 전 유저 페널티 로그 조회.
    // 5. 유저 정지.
    @Transactional
    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void userPenaltySave(FrontUserPenaltyRequestDTO dto) {
        Long reportId = dto.getReportId();
        Long period = dto.getPeriod();
        Long reasonCode =  dto.getReasonCode();
        UpdateReportInfoDTO updateReportInfoDTO = reportService.updateReport(reportId, Report.Status.RESOLVED);
        Long id = updateReportInfoDTO.getTargetId();
        Long userId = null;

        switch (updateReportInfoDTO.getTargetType()){
            case post:
                userId = localBoardRepository.findLocalBoardUserId(id);
                localBoardRepository.boardStatusReport(id, LocalBoards.BoardStatus.REPORT);
                break;

            case comment:
                userId = boardCommentRepository.findCommentsUserId(id);
                boardCommentRepository.commentStatusReport(id, Comments.CommentsStatus.REPORT);
                break;

            case chat_message:
                userId = chatMessageRepository.findChatMessageUserId(id);
                break;

            // 어떻게 할지 고민중
            case chat_room:

                break;
            //
            case sharing:
                userId =  sharingRepository.findSharingPostUserId(id);
                SharingStatusRequestDTO sharingStatusRequestDTO = new SharingStatusRequestDTO(
                        id,
                        userId,
                        SharingPosts.Status.REPORT
                );
                sharingRepository.updateSharingStatus(sharingStatusRequestDTO);
                break;

            // 추후에
            case sharing_log:

                break;
            default:
                throw new IllegalArgumentException("타입이 존재하지않거나 알맞지 않음");
        }
       if(userId == null){
           throw new IllegalArgumentException("신고된 유저가 존재하지 않습니다.");
       }

        // 7일, 30일 , 영구정지
       Timestamp userEndAt =  userPenaltyRepository.existEndAtUserId(userId, UserPenalty.PenaltyStatus.ACTIVE);

        UserPenaltyInsertRequestDTO userPenaltyInsertRequestDTO = null;
        Timestamp now = Timestamp.valueOf(LocalDateTime.now());

       if(userEndAt == null || userEndAt.before(now)){
            if(period == 7){
                Timestamp afterSevenDay = Timestamp.valueOf(LocalDateTime.now().plusDays(7));
                userPenaltyInsertRequestDTO = new UserPenaltyInsertRequestDTO(
                        userId,
                        reasonCode,
                        now,
                        afterSevenDay,
                        reportId
                );
            } else if (period == 30) {
                Timestamp afterOneMonths = Timestamp.valueOf(LocalDateTime.now().plusMonths(1));
                userPenaltyInsertRequestDTO = new UserPenaltyInsertRequestDTO(
                        userId,
                        reasonCode,
                        now,
                        afterOneMonths,
                        reportId
                );
            } else {
                // 영구정지
                userRepository.permanentStop(userId, User.Status.BLOCKED);
            }
       }else {
          LocalDateTime endAt = userEndAt.toLocalDateTime();
           if(period == 7){
               Timestamp afterSevenDay = Timestamp.valueOf(endAt.plusDays(7));
               userPenaltyInsertRequestDTO = new UserPenaltyInsertRequestDTO(
                       userId,
                       reasonCode,
                       userEndAt,
                       afterSevenDay,
                       reportId
               );
           } else if (period == 30) {
               Timestamp afterOneMonths = Timestamp.valueOf(endAt.plusDays(30));
               userPenaltyInsertRequestDTO = new UserPenaltyInsertRequestDTO(
                       userId,
                       reasonCode,
                       userEndAt,
                       afterOneMonths,
                       reportId
               );
           } else {
               // 영구정지.
                userRepository.permanentStop(userId, User.Status.BLOCKED);
           }
       }
       userPenaltyRepository.save(userPenaltyInsertRequestDTO.toUserPenaltyEntity());
    }
    
    // 유저 패널티 적용 기간 체크 메서드
    // 1. 지역 게시판  작성 , 수정
    // 2. 댓글 작성, 대댓글 작성,  수정(보류)
    // 3. 나눔 게시판 작성, 수정
    @Override
    public String existEndAtUserId(Long userId) {
        Timestamp now = Timestamp.valueOf(LocalDateTime.now());
        Timestamp endAt =  userPenaltyRepository.existEndAtUserId(userId, UserPenalty.PenaltyStatus.ACTIVE);
        String remainTime = null;

        if(endAt == null){
            throw new IllegalArgumentException("제제 정보가 없습니다.");
        }

        if(endAt.after(now)){
            Duration duration = Duration.between(now.toLocalDateTime(), endAt.toLocalDateTime());

            long day = duration.toDaysPart();
            long hours = duration.toHoursPart();
            long minutes = duration.toMinutesPart();

            remainTime = day + "일 "+hours+"시간 "+minutes+"분";
        }

        return remainTime;
    }
}
