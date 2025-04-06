package com.frombusan.repository;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.frombusan.model.restaurant.Restaurant;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface RestaurantMapper {
	
	List<Restaurant> findRestaurantsByTouristSpot(@Param("lat") Double lat,
												  @Param("lng") Double lng,
												  @Param("radiusKm") double radiusKm);

	List<Restaurant> findRestaurantsByFestival(@Param("lat") Double lat,
											   @Param("lng") Double lng,
											   @Param("radiusKm") double radiusKm);

}
