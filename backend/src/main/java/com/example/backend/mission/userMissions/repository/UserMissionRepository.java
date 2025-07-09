package com.example.backend.mission.userMissions.repository;

import com.example.backend.entity.mission.UserMissions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMissionRepository extends JpaRepository<UserMissions ,Long>, UserMissionCustom {
}
