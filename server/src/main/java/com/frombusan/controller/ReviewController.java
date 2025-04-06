package com.frombusan.controller;

import java.util.List;
import java.util.Map;

import com.frombusan.dto.request.ReviewUpdateDto;
import com.frombusan.dto.response.ReviewInfoDto;
import com.frombusan.dto.request.ReviewWriteDto;
import com.frombusan.dto.response.ReviewListDto;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.frombusan.model.member.Member;
import com.frombusan.model.review.Review;
import com.frombusan.model.review.ReviewLikes;
import com.frombusan.model.review.ReviewUpdateForm;
import com.frombusan.service.ReviewService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("review")
@RestController
public class ReviewController {

    private final ReviewService reviewService;

    // 글쓰기페이지 리뷰장소 리스트
    @GetMapping("places")
    public ResponseEntity<List<String>> getPlaces() {
        List<String> places = reviewService.getPlaces();
        return ResponseEntity.ok(places);
    }

    // 게시글 쓰기
    @PostMapping("write")
    public ResponseEntity<String> write(@SessionAttribute(value = "loginMember") Member loginMember,
                        @RequestBody ReviewWriteDto reviewWriteDto) {
        reviewService.write(loginMember,reviewWriteDto);
        return ResponseEntity.ok("게시글 쓰기 성공");
    }

    // 게시글 전체 보기
    @GetMapping("list")
    public ResponseEntity<ReviewListDto> getList(@RequestParam(value = "page", defaultValue = "1") int page,
                       @RequestParam(value = "searchText", defaultValue = "") String searchText) {
        try {
            ReviewListDto list = reviewService.getList(searchText, page);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // 게시글 읽기
    @GetMapping("{id}")
    public ResponseEntity<ReviewInfoDto> read(@PathVariable(value = "id") Long review_id,
                                              @SessionAttribute(value = "loginMember") Member loginMember) {
        try {
            ReviewInfoDto review = reviewService.read(review_id,loginMember);
            return ResponseEntity.ok(review);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // 게시글 수정
    @PutMapping("update")
    public ResponseEntity<String> update(@SessionAttribute(value = "loginMember") Member loginMember,
                                         @RequestBody ReviewUpdateDto reviewUpdateDto) {
        reviewService.update(loginMember,reviewUpdateDto);
        return ResponseEntity.ok("게시글 수정 완료");
    }

      // 게시글 삭제
    @PostMapping("delete/{id}")
    public ResponseEntity<String> remove(@SessionAttribute(value = "loginMember") Member loginMember,
                         @PathVariable(value = "id") Long reviewId) {
        reviewService.removeReview(loginMember,reviewId);
        return ResponseEntity.ok("게시글 삭제 완료");
    }

 // 한 장소 게시글 전체 보기
    @GetMapping("reviewList")
    public String reviewList(@RequestParam(value = "page", defaultValue = "1") int page,
                       @RequestParam(value = "searchText", defaultValue = "") String searchText,
                       Model model,@RequestParam("main_title") String review_place
                       ,@SessionAttribute(value = "loginMember", required = false) Member loginMember
    					) {
        //int total = reviewService.getTotal(searchText);
        //PageNavigator navi = new PageNavigator(countPerPage, pagePerGroup, page, total);
        // 데이터베이스에 저장된 모든 Board 객체를 리스트 형태로 받는다.
        //List<Review> reviews = reviewService.findReviews(searchText, navi.getStartRecord(), navi.getCountPerPage());

        List<Review> findReviewsByMainTitle = reviewService.findReviewsByMainTitle(review_place);
        //model.addAttribute("member_id",loginMember.getMember_id());
        // Board 리스트를 model 에 저장한다.
        model.addAttribute("findReviewsByMainTitle", findReviewsByMainTitle);

        String reviewPlace = review_place.substring(1, review_place.length() - 1);
        model.addAttribute("reviewPlace", reviewPlace);
        // PageNavigation 객체를 model 에 저장한다.
        //model.addAttribute("navi", navi);
        //model.addAttribute("searchText", searchText);

        // board/list.html 를 찾아서 리턴한다.
        return "review/reviewList";
    }

    // 내가 쓴 리뷰 리스트
    @GetMapping("myReviewList")
    public String myReviewList(
                        @SessionAttribute(value = "loginMember", required = false) Member loginMember
                        ,Model model) {

    	List<Review> reviews = reviewService.findReviewsByMemberId(loginMember.getMember_id());
    	if(loginMember!=null) {
    		model.addAttribute("reviews", reviews);
    		model.addAttribute("loginMember",loginMember.getMember_id());
    	}

    	return "member/myReviewList";
    }


  //좋아요 기능
// 	@PostMapping("/like")
//	public ResponseEntity<Review> likeReview(@RequestParam("review_id") Long review_id
//											,@SessionAttribute(value = "loginMember", required = false) Member loginMember
//											) {
// 		List<String> findReviewLikes = reviewService.findLikesMemberId(review_id);
//		List<Map<String, Object>> findLikesById = reviewService.findLikesById(review_id);
//
//
//		Review review= reviewService.findReview(review_id);
//		ReviewLikes reviewLikes = new ReviewLikes();
//		String member_id = loginMember.getMember_id();
//
//		Object like_id = null;
//		for (int i = 0; i < findLikesById.size(); i++) {
//		    Map<String, Object> map = findLikesById.get(i);
//		    if (member_id.equals((String)map.get("MEMBER_ID"))) {
//		        like_id =map.get("LIKE_ID");
//		        break;
//		    }
//		}
//		if (review.getReview_like() == null) {
//		    review.setReview_like(0L);
//		}
//		log.info("aa:{}",review);
//		if (review != null) {
//			if(!findReviewLikes.contains(member_id)) {
//				review.addReview_like();
//				reviewLikes.setMember_id(member_id);
//				reviewLikes.setReview_id(review_id);
//				reviewService.saveLikes(reviewLikes);
//				review.setLiked(true);
//				log.info("aa:{}",review);
//
//			}
//			else {
//				review.removeReview_like();
//				reviewService.deleteLike(like_id);
//				review.setLiked(false);
//		    }
//			reviewService.updateReview(review);
//	    return ResponseEntity.ok(review);
//	  } else {
//	    // 관광지 정보가 없는 경우, 오류 응답을 반환합니다.
//	    return ResponseEntity.badRequest().build();
//	  }
//	}

}
