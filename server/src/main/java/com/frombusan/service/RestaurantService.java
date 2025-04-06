package com.frombusan.service;

import com.frombusan.model.festival.Festival;
import com.frombusan.model.restaurant.Restaurant;
import com.frombusan.model.tourist.Tourist_Spot;
import com.frombusan.repository.FestivalMapper;
import com.frombusan.repository.RestaurantMapper;
import com.frombusan.repository.TouristMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class RestaurantService {

    private final TouristMapper touristMapper;
    private final FestivalMapper festivalMapper;
    private final RestaurantMapper restaurantMapper;

    private static final String TOURIST = "tourist";
    private static final String FESTIVAL = "festival";
    private static final double radiusKm = 5.0;

    public List<Restaurant> getList(Long id, String type) {
        List<Restaurant> findRestaurantList = null;

        if (TOURIST.equals(type)) {
            Tourist_Spot touristSpot = touristMapper.findTouristSpot(id);
            findRestaurantList = restaurantMapper.findRestaurantsByTouristSpot(touristSpot.getLat(),touristSpot.getLng(), radiusKm);
        }
        else if (FESTIVAL.equals(type)) {
            Festival festival = festivalMapper.findFestival(id);
            findRestaurantList = restaurantMapper.findRestaurantsByFestival(festival.getLat(), festival.getLng(), radiusKm);
        }
        else {
            throw new IllegalArgumentException("Invalid type");
        }
        return findRestaurantList;
    }
}
