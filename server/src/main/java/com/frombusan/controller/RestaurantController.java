package com.frombusan.controller;

import java.util.List;

import com.frombusan.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.frombusan.model.member.Member;
import com.frombusan.model.restaurant.Restaurant;
import com.frombusan.repository.RestaurantMapper;
import com.frombusan.service.ReviewService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RequestMapping("restaurant")
@Controller
@RequiredArgsConstructor
public class RestaurantController {

	@Autowired
	private RestaurantService restaurantService;

	/**
	 *
	 * @param id
	 * @param type 타입에 따라 명소인지 페스티벌인지 구분 , ex) tourist,festival
	 * @return 맛집반환
	 */
	@GetMapping("list/{id}")
	public ResponseEntity<List<Restaurant>> getList(@PathVariable(value = "id") Long id
													,@RequestParam String type) {
		List<Restaurant> findRestaurantList = restaurantService.getList(id,type);
		return ResponseEntity.ok(findRestaurantList);
	}

}
