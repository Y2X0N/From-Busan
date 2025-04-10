package com.frombusan.service;

import java.util.List;
import java.util.Map;

import com.frombusan.dto.request.ReviewUpdateDto;
import com.frombusan.dto.request.ReviewWriteDto;
import com.frombusan.dto.response.*;
import com.frombusan.model.member.Member;
import com.frombusan.model.tourist.TouristSpotLikes;
import com.frombusan.util.PageNavigator;
import org.apache.ibatis.session.RowBounds;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.frombusan.model.review.Review;
import com.frombusan.model.review.ReviewLikes;
import com.frombusan.repository.ReviewMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.thymeleaf.util.StringUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReviewService {

    private final ReviewMapper reviewMapper;

    public static final int countPerPage = 10;
    public static final int pagePerGroup = 5;


    @Transactional
    public void write(Member loginMember, ReviewWriteDto reviewWriteDto) {
        try {
            Review review = ReviewWriteDto.toReview(reviewWriteDto);
            review.setMember_id(loginMember.getMember_id());
            reviewMapper.saveReview(review);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Transactional(readOnly = true)
    public ReviewListDto getList(String searchText, int page) {
        try {
            int total = reviewMapper.getTotal(searchText);
            PageNavigator navi = new PageNavigator(countPerPage,pagePerGroup, page, total);
            RowBounds rowBounds = new RowBounds(navi.getStartRecord(), navi.getCountPerPage());
            List<Review> reviews = reviewMapper.findReviews(searchText, rowBounds);
            return new ReviewListDto(reviews,navi);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public ReviewInfoDto read(Long reviewId, Member loginMember) {

        try {
            Review findReview = reviewMapper.findReview(reviewId);
            findReview.addHit();
            reviewMapper.updateReview(findReview);

            Boolean isFavorite = null;

            if(checkLoginMember(loginMember)){
                isFavorite = reviewMapper.checkMemberLikeStatus(reviewId, loginMember.getMember_id());
            }

            ReviewInfoDto reviewInfoDto = new ReviewInfoDto();
            reviewInfoDto.setReview(findReview);
            reviewInfoDto.setIsFavorite(isFavorite);
            return reviewInfoDto;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void update(Member loginMember, ReviewUpdateDto reviewUpdateDto) {
        Review review = reviewMapper.findReview(reviewUpdateDto.getReviewId());

        if (review == null || !review.getMember_id().equals(loginMember.getMember_id())) {
            throw new IllegalArgumentException("수정 권한 없음");
        }
        // 제목을 수정한다.
        review.setTitle(reviewUpdateDto.getTitle());
        // 내용을 수정한다.
        review.setContents(reviewUpdateDto.getContents());
        reviewMapper.updateReview(review);
    }

    public List<String> getPlaces() {
        return reviewMapper.findAllMainTitle();
    }

    @Transactional
    public void removeReview(Member loginMember,Long reviewId) {
        Review findReview = reviewMapper.findReview(reviewId);

        if (findReview == null || !findReview.getMember_id().equals(loginMember.getMember_id())) {
            throw new IllegalArgumentException("삭제 권한 없음");
        }

        reviewMapper.removeReview(reviewId);
    }

    @Transactional(readOnly = true)
    public RelationReviewListDto getReviewListByMainTitle(int page, String searchText, String reviewPlace) {
        int total = reviewMapper.getTotal(searchText);
        PageNavigator navi = new PageNavigator(countPerPage,pagePerGroup, page, total);
        RowBounds rowBounds = new RowBounds(navi.getStartRecord(), navi.getCountPerPage());
        List<Review> reviews = reviewMapper.findReviews(reviewPlace,rowBounds);
        return new RelationReviewListDto(reviews,navi);
    }

    @Transactional
    public ReviewLikeDto toggleLike(Long reviewId, Member loginMember) {
        Review findReview = reviewMapper.findReview(reviewId);

        boolean isFavorite = reviewMapper.checkMemberLikeStatus(reviewId, loginMember.getMember_id());

        if (isFavorite) {
            findReview.removeReview_like();
            ReviewLikes findReviewLike = reviewMapper.findReviewLike(reviewId, loginMember.getMember_id());
            reviewMapper.deleteLike(findReviewLike.getLike_id());
        } else {
            findReview.addReview_like();
            ReviewLikes reviewLike = new ReviewLikes();
            reviewLike.setMember_id(loginMember.getMember_id());
            reviewLike.setReview_id(findReview.getReview_id());
            reviewMapper.saveLikes(reviewLike);
        }
        reviewMapper.updateReview(findReview);
        ReviewLikeDto reviewLikeDto = new ReviewLikeDto();
        reviewLikeDto.setReview(findReview);
        reviewLikeDto.setFavorite(!isFavorite);
        return reviewLikeDto;
    }

    private boolean checkLoginMember(Member loginMember){
        return loginMember != null && !StringUtils.isEmpty(loginMember.getMember_id());
    }

}
