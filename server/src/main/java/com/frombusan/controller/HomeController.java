package com.frombusan.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import com.frombusan.dto.HomeDto;
import com.frombusan.service.FestivalService;
import com.frombusan.service.TouristService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.frombusan.model.festival.Festival;
import com.frombusan.model.restaurant.Restaurant;
import com.frombusan.model.tourist.Tourist_Spot;
import com.frombusan.repository.FestivalMapper;
import com.frombusan.repository.RestaurantMapper;
import com.frombusan.repository.TouristSpotMapper;
import com.modernmt.ModernMT;
import com.modernmt.model.Memory;
import com.modernmt.model.Translation;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class HomeController {

	@Autowired
	private TouristService touristService;
	
	@Autowired
	private FestivalService festivalService;

	@GetMapping("/")
	public HomeDto home() {
		List<Tourist_Spot> allTouristForMain = touristService.findAllTouristForMain();
		List<Festival> findAllFestival = festivalService.findAllFestivalForMain();
		return new HomeDto(allTouristForMain,findAllFestival);
	}

	/*
	 * @PostMapping("restaurant/{restaurant_id}") public String findRestaurant(Long
	 * restaurant_id, Model model) { List<Restaurant> findAllRestaurant =
	 * spotMapper.findAllRestaurant();
	 * 
	 * model.addAttribute(findAllRestaurant);
	 * 
	 * return "main/index"; }
	 */
	
	
}
