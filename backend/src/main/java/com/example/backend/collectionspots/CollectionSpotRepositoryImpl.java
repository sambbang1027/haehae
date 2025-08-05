package com.example.backend.collectionspots;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;

public class CollectionSpotRepositoryImpl implements CollectionSpotRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;   // ← 변수명은 entityManager

    @Override
    public List<CollectionSpot> findNearbySpots(String wasteItem,
                                                double centerLat,
                                                double centerLng,
                                                double radiusInMeters) {

        System.out.println("💡 QueryDSL 반경 내 검색 진입 wasteItem = " + wasteItem);

        QCollectionSpot spot = QCollectionSpot.collectionSpot;

        double radiusKm = radiusInMeters / 1000.0;

        return new JPAQueryFactory(entityManager)
                .selectFrom(spot)
                .where(
                        //spot.wasteItem.eq(wasteItem),
                        (wasteItem == null || wasteItem.isBlank()) ? null : spot.wasteItem.eq(wasteItem),
                        distance(spot.latitude, spot.longitude, centerLat, centerLng)
                                .loe(radiusKm)                // km 단위 비교
                )
                .fetch();
    }

    /** Haversine 거리(km) */
    private NumberExpression<Double> distance(NumberExpression<? extends Number> latCol,
                                              NumberExpression<? extends Number> lngCol,
                                              double centerLat,
                                              double centerLng) {

        final double R = 6371; // 지구 반지름(km)

        return Expressions.numberTemplate(Double.class,
                "({0} * acos(" +
                        "cos(radians({1})) * cos(radians({2})) * " +
                        "cos(radians({3}) - radians({4})) + " +
                        "sin(radians({1})) * sin(radians({2}))" +
                        "))",
                R,
                centerLat,               // {1}
                latCol,                  // {2}
                centerLng,               // {3}
                lngCol                   // {4}
        );
    }
}
