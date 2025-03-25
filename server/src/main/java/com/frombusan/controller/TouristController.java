package com.frombusan.controller;


import com.frombusan.dto.response.TouristInfoDto;
import com.frombusan.dto.response.TouristInfoLikeDto;
import com.frombusan.dto.response.TouristInfoWishListDto;
import com.frombusan.dto.response.TouristListDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.frombusan.model.member.Member;
import com.frombusan.service.TouristService;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@RequestMapping("tourist")
@RestController
public class TouristController {

    @Autowired
    private TouristService touristService;

    // 명소 리스트 조회
    @GetMapping("list")
    public ResponseEntity<TouristListDto> getList(@RequestParam(value = "page", defaultValue = "1") int page,
                                                  @RequestParam(value = "searchText", defaultValue = "") String searchText) {
        try {
            TouristListDto list = touristService.getList(searchText, page);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // 명소 상세조회
    @GetMapping("{id}")
    public ResponseEntity<TouristInfoDto> getTouristById(@PathVariable(value = "id") Long touristSpotId
                       , @SessionAttribute(value = "loginMember", required = false) Member loginMember) {
        try {
            TouristInfoDto findTourist = touristService.getTouristById(touristSpotId, loginMember);
            return ResponseEntity.ok(findTourist);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // 명소 좋아요
    @PostMapping("{id}/like")
    public ResponseEntity<TouristInfoLikeDto> toggleLike(@PathVariable(value = "id") Long tourist_Spot_id
                                                      , @SessionAttribute(value = "loginMember") Member loginMember) {

        try {
            TouristInfoLikeDto touristInfoLikeDto = touristService.toggleLike(tourist_Spot_id, loginMember);
            return ResponseEntity.ok(touristInfoLikeDto);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    // 명소 찜목록 추가
    @PostMapping("{id}/wishlist")
    public ResponseEntity<TouristInfoWishListDto> toggleWishList(
              @RequestParam("touristSpotId") Long tourist_Spot_id
            , @SessionAttribute(value = "loginMember") Member loginMember) {
        try {
            TouristInfoWishListDto touristInfoWishListDto = touristService.toggleWishList(tourist_Spot_id, loginMember);
            return ResponseEntity.ok(touristInfoWishListDto);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
