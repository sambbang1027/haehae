package com.example.backend.sharing.controller;


import com.example.backend.sharing.dto.response.SharingListReponseDTO;
import com.example.backend.sharing.service.SharingListQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("sharing")
public class SharingQueryController {

    @Autowired
    SharingListQueryService sharingListQueryService;

    @GetMapping("/list/query")
    public ResponseEntity<List<SharingListReponseDTO>> getSharingListResponse() {
        Long UserId = 6L;

        String regionCode = "1168010300";

        List<SharingListReponseDTO> sharingList = sharingListQueryService.getSharingList(regionCode);

        return ResponseEntity.ok(sharingList);
    };
}
