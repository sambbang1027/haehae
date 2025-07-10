package com.example.backend.userLevel.repsoitory;

import com.example.backend.entity.user.UserLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserLevelRepository extends JpaRepository<UserLevel,Long > {

    @Query(" SELECT ul FROM UserLevel ul" +
            " WHERE ul.id =:nextLevelId")
    UserLevel findUserNextLevels(@Param("nextLevelId") Long nextLevelId);

}
