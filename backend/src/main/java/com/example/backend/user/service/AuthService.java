package com.example.backend.user.service;

import com.example.backend.user.dto.LocalRegisterDTO;

public interface AuthService {

    void localRegister(LocalRegisterDTO localRegisterDTO);

}
