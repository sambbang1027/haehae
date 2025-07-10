package com.example.backend.user.service;

import com.example.backend.user.dto.LocalRegisterDTO;
import com.example.backend.user.dto.UserCurrentAndTotalPointResponseDTO;

public interface UserService {
    void localRegister(LocalRegisterDTO localRegisterDTO);
}
