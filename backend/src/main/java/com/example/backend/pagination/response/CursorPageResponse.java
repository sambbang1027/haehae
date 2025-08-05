package com.example.backend.pagination.response;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CursorPageResponse<T> {
    private List<T> content;
    private Long nextCursor;
    private boolean hasNext;
}
