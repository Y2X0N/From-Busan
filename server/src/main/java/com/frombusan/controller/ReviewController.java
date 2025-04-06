package com.frombusan.controller;

import java.util.List;
import java.util.Map;

import com.frombusan.dto.request.ReviewUpdateDto;
import com.frombusan.dto.response.RelationReviewListDto;
import com.frombusan.dto.response.ReviewInfoDto;
import com.frombusan.dto.request.ReviewWriteDto;
import com.frombusan.dto.response.ReviewLikeDto;
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

    // 관련 리뷰 , 명소나 페스트벌의 main_title의 리뷰를 전부 불러옴
    @GetMapping("reviewList")
    public ResponseEntity<RelationReviewListDto> getReviewListByMainTitle(
                                @RequestParam(value = "page", defaultValue = "1") int page,
                                @RequestParam(value = "searchText", defaultValue = "") String searchText,
                                @RequestParam("main_title") String reviewPlace) {

        RelationReviewListDto reviewListByMainTitle = reviewService.getReviewListByMainTitle(page, searchText, reviewPlace);
        return ResponseEntity.ok(reviewListByMainTitle);
    }

  //좋아요 기능
// 	@PostMapping("{id}/like")
//	public ResponseEntity<Review> toggleLike(@PathVariable(value = "id") Long reviewId
//                                            ,@SessionAttribute(value = "loginMember") Member loginMember) {
//        ReviewLikeDto reviewLikeDto = reviewService.toggleLike(reviewId,loginMember);
//
//        List<String> findReviewLikes = reviewService.findLikesMemberId(review_id);
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
