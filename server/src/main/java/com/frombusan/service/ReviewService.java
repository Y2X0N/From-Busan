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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.frombusan.model.review.Review;
import com.frombusan.model.review.ReviewLikes;
import com.frombusan.repository.ReviewMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional(readOnly = true)
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

            Boolean isFavorite = reviewMapper.checkMemberLikeStatus(reviewId, loginMember.getMember_id());

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
            findReview.removePlace_like();

            TouristSpotLikes findTouristSpotLike = touristMapper.findTouristSpotLike(touristSpotId, loginMember.getMember_id());
            touristMapper.deleteLike(findTouristSpotLike.getLike_id());
        } else {
            findTouristSpot.addPlace_like();

            TouristSpotLikes touristSpotLike = new TouristSpotLikes();
            touristSpotLike.setMember_id(loginMember.getMember_id());
            touristSpotLike.setTourist_Spot_id(touristSpotId);
            touristMapper.saveLikes(touristSpotLike);
        }

        touristMapper.updateTourist(findTouristSpot);

        TouristInfoLikeDto touristInfoLikeDto = new TouristInfoLikeDto();
        touristInfoLikeDto.setTouristSpot(findTouristSpot);
        touristInfoLikeDto.setFavorite(!isFavorite);
        return touristInfoLikeDto;

    }


    public List<Review> findReviewsByMainTitle(String review_place) {
	String result = review_place.substring(1, review_place.length() - 1);
    return reviewMapper.findReviewsByMainTitle(result);
    }

    public List<Review> findReviewsByMemberId(String member_id) {
        return reviewMapper.findReviewsByMemberId(member_id);
    }

    //좋아요
 	public List<String> findLikesMemberId(Long review_id ){
 		return reviewMapper.findLikesMemberId( review_id);
 	}

 	public List<Map<String,Object>> findLikesById(Long review_id){
 		return reviewMapper.findLikesById(review_id);
 	}

 	public void saveLikes(ReviewLikes reviewLikes) {
 		reviewMapper.saveLikes(reviewLikes);
 	}

 	public void deleteLike(Object like_id) {
 		reviewMapper.deleteLike(like_id);
 	}


}
