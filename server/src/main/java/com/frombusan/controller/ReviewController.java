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
                                              @SessionAttribute(value = "loginMember", required = false) Member loginMember) {
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
 	@PostMapping("{id}/like")
	public ResponseEntity<ReviewLikeDto> toggleLike(@PathVariable(value = "id") Long reviewId
                                            ,@SessionAttribute(value = "loginMember") Member loginMember) {
        try {
            ReviewLikeDto reviewLikeDto = reviewService.toggleLike(reviewId,loginMember);
            return ResponseEntity.ok(reviewLikeDto);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

}
