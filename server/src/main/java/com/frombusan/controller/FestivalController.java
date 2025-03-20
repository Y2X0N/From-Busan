package com.frombusan.controller;

import java.util.List;
import java.util.Map;

import com.frombusan.dto.FestivalListDto;
import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.frombusan.model.festival.Festival;
import com.frombusan.model.festival.FestivalLikes;
import com.frombusan.model.festival.FestivalMyList;
import com.frombusan.model.member.Member;
import com.frombusan.repository.FestivalMapper;
import com.frombusan.service.FestivalService;
import com.frombusan.util.PageNavigator;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("festival")
@RestController
public class FestivalController {

	@Autowired
	private FestivalMapper festivalMapper;
	@Autowired
	private FestivalService festivalService;

	@GetMapping("list")
	public FestivalListDto getList(@RequestParam(value = "page", defaultValue = "1") int page,
								@RequestParam(value = "searchText", defaultValue = "") String searchText) {
		FestivalListDto list = festivalService.getList(searchText, page);
		return list;
	}

	// 게시글 읽기
	@GetMapping("/{id}")
	public ResponseEntity<Festival> getFestival(@PathVariable(value = "id") Long festivalId, @SessionAttribute(value ="loginMember", required = false) Member loginMember) {
		try {
			Festival festival = festivalService.findFestivalById(festivalId, loginMember);
			return ResponseEntity.ok(festival);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	//좋아요 기능
	 	@PostMapping("/like")
		public ResponseEntity<Festival> likeTouristSpot(@RequestParam("festivalId") Long festival_id
															,@SessionAttribute(value = "loginMember", required = false) Member loginMember
															) {

	 		List<String> findFestivalLikes = festivalMapper.findLikesMemberId(festival_id);
			List<Map<String, Object>> findLikesById = festivalMapper.findLikesById(festival_id);
			
			Festival festival= festivalMapper.findFestival(festival_id);
			FestivalLikes festivalLikes = new FestivalLikes();
			String member_id = loginMember.getMember_id();

			Object like_id = null;
			for (int i = 0; i < findLikesById.size(); i++) {
			    Map<String, Object> map = findLikesById.get(i);
			    if (member_id.equals((String)map.get("MEMBER_ID"))) {
			        like_id =map.get("LIKE_ID");
			        break;
			    }
			}

			if (festival != null) {
				if(!findFestivalLikes.contains(member_id)) {
					festival.addPlace_like();
					festivalLikes.setMember_id(member_id);
					festivalLikes.setFestival_id(festival_id);
					festivalMapper.saveLikes(festivalLikes);
					festival.setLiked(true);
				}
				else {
					festival.removePlace_like();
					festivalMapper.deleteLike(like_id);
					festival.setLiked(false);
			    }
				log.info("festival15:{}",festival);
				festivalMapper.updateFestival(festival);
		    return ResponseEntity.ok(festival);
		  } else {
		    // 관광지 정보가 없는 경우, 오류 응답을 반환합니다.
		    return ResponseEntity.badRequest().build();
		  }
		}
	    
	 	@PostMapping("/myList")
		public ResponseEntity<Festival> myTouristSpot(@RequestParam("festival_id") Long festival_id
															,@SessionAttribute(value = "loginMember", required = false) Member loginMember
															) {

			List<String> findFestivalMyList = festivalMapper.findMyListMemberId(festival_id);
			List<Map<String, Object>> findMyListById = festivalMapper.findMyListById(festival_id);
			Festival festival= festivalMapper.findFestival(festival_id);
			
			
			FestivalMyList festivalMyList = new FestivalMyList();
			String member_id = loginMember.getMember_id();
			
			
			Object wishboard_id = null;
			for (int i = 0; i < findMyListById.size(); i++) {
			    Map<String, Object> map = findMyListById.get(i);
			    if (member_id.equals((String)map.get("MEMBER_ID"))) {
			    	wishboard_id =map.get("WISHBOARD_ID");
			        break;
			    }
			}
			if (festival != null) {
				if(!findFestivalMyList.contains(member_id)) {
					festival.addWishList();
					festivalMyList.setMember_id(member_id);
					festivalMyList.setFestival_id(festival_id);
					festivalMapper.saveMyList(festivalMyList);
					festival.setJjim(true);
				}
				else {
					festival.removeWishList();
					festivalMapper.deleteMyList(wishboard_id);
					festival.setJjim(false);
			    }
				festivalMapper.updateFestival(festival);

			    
		    return ResponseEntity.ok(festival);
		  } else {
		    // 관광지 정보가 없는 경우, 오류 응답을 반환합니다.
		    return ResponseEntity.badRequest().build();
		  }
		}
}	    
