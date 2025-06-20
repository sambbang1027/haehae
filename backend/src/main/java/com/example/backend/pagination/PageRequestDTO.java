package com.example.backend.pagination;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
public class PageRequestDTO {
    private int page;
    private int size;

    public int getOffset(){
        return Math.max(0, (page - 1) * size);
    }
    public int getLimit(){
        return size;
    }
}
