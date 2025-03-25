package com.frombusan.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.frombusan.model.AttachedImg;
import com.frombusan.model.review.Review;
import com.frombusan.model.review.ReviewLikes;

@Mapper
public interface ReviewMapper {

    // 게시글 저장
    void saveReview(Review review);

    // 전체 게시글 갯수
    int getTotal(String searchText);

    // 전체 게시글 검색
    List<Review> findReviews(String searchText, RowBounds rowBounds);

    // 게시글 아이디로 검색
    Review findReview(Long review_id);

    // 게시글 수정
    void updateReview(Review updateReview);

    // 게시글 삭제
    void removeReview(Long review_id);

    List<AttachedImg> findFilesByReviewId(Long review_id);

    List<AttachedImg> findFilesForRemove(Long review_id);

    //장소 이름으로 리뷰찾기(명소)
    List<Review> findReviewsByMainTitle(String review_place);

    // Member ID로 작성한 글 찾기
    List<Review> findReviewsByMemberId(String member_id);

    //좋아요 기능
    List<String> findLikesMemberId(Long review_id);

    List<Map<String, Object>> findLikesById(Long review_id);

    void saveLikes(ReviewLikes reviewLikes);

    void deleteLike(Object like_id);

    List<Review> findReviewRank5();

    // 글쓰기 타이틀 리스트
    List<String> findAllMainTitle();

}
