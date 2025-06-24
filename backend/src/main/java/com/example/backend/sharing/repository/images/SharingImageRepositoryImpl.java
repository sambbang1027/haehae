package com.example.backend.sharing.repository.images;

import com.example.backend.entity.sharing.QSharingImages;
import com.example.backend.sharing.dto.response.QSharingImageResponseDTO;
import com.example.backend.sharing.dto.response.SharingImageResponseDTO;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SharingImageRepositoryImpl implements SharingImageRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public SharingImageRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<SharingImageResponseDTO> getSharingImagesById(Long sharingPostId){
        QSharingImages si = QSharingImages.sharingImages;

        return queryFactory
                .select(new QSharingImageResponseDTO(
                        si.sharingImageId,
                        si.sharingPostId,
                        si.imgUrl
                        )
                )
                .from(si)
                .where(si.sharingPostId.eq(sharingPostId))
                .fetch();
    }
}
