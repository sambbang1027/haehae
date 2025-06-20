package com.example.backend.pagenation;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageRequestDTO {
    private int page;
    private int size;

    public int getOffset(){
        return (page - 1) * size;
    }
    public int getLimit(){
        return size;
    }
}
