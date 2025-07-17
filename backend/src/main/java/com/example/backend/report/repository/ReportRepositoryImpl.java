package com.example.backend.report.repository;

import com.example.backend.entity.report.QReport;
import com.example.backend.entity.report.Report;
import com.example.backend.entity.user.QUser;
import com.example.backend.report.dto.response.QReportListResponseDTO;
import com.example.backend.report.dto.response.ReportListResponseDTO;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReportRepositoryImpl implements ReportCustom{

    private final JPAQueryFactory jpaQueryFactory;

    public ReportRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

     QReport r = QReport.report;
     QUser u = QUser.user;
    @Override
    public List<ReportListResponseDTO> reportList(Report.Status status, Report.TargetType targetType, String searchText ){
        BooleanBuilder builder = new BooleanBuilder();

        if(status != null){
            builder.and(r.status.eq(status));
        }
        if(targetType != null){
            builder.and(r.targetType.eq(targetType));
        }

        if(searchText != null && searchText.trim().isEmpty()){
            BooleanBuilder searchBuilder = new BooleanBuilder();
            searchBuilder.or(r.details.containsIgnoreCase(searchText));
            searchBuilder.or(u.nickname.containsIgnoreCase(searchText));
            builder.and(searchBuilder);
        }

        return jpaQueryFactory
                    .select(new QReportListResponseDTO(r.id, r.reporterId, r.reasonCode, r.details))
                    .from(r)
                    .join(u)
                    .on(r.reporterId.eq(u.id))
                    .where(builder)
                    .fetch();
    }

    @Override
    public void UpdateReportStatus(Long reportId, Report.Status status) {
        jpaQueryFactory.update(r)
                .set(r.status, status)
                .where(r.id.eq(reportId))
                .execute();
    }
}
