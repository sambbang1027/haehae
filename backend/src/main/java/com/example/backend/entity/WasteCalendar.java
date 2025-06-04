package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "waste_calendar")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class WasteCalendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "waste_calendar_id")
    private Long id;

    @Column(name = "region_code", length = 20)
    private String regionCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "day_of_week", nullable = false)
    private DayOfWeekEnum dayOfWeek;

    @Enumerated(EnumType.STRING)
    @Column(name = "day_pattern", nullable = false)
    private DayPatternEnum dayPattern;

    @Column(name = "waste_type", length = 100, nullable = false)
    private String wasteType;

    @Column(name = "note", length = 200)
    private String note;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Getter
    public enum DayOfWeekEnum {
        MON("mon"), TUE("tue"), WED("wed"),
        THU("thu"), FRI("fri"), SAT("sat"), SUN("sun");

        private final String code;
        DayOfWeekEnum(String code) { this.code = code; }
    }

    @Getter
    public enum DayPatternEnum {
        WEEKLY("weekly"), BIWEEKLY("biweekly"), MONTHLY("monthly");

        private final String code;
        DayPatternEnum(String code) { this.code = code; }
    }
}
