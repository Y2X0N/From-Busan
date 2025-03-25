package com.frombusan.dto.request;

import com.frombusan.model.review.Review;
import com.frombusan.model.review.ReviewWriteForm;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewWriteDto {
    private String title;
    private String contents;
    private String review_place;

    public static Review toReview(ReviewWriteDto reviewWriteDto) {
        Review review = new Review();
        review.setTitle(reviewWriteDto.getTitle());
        review.setContents(reviewWriteDto.getContents());
        review.setReview_place(reviewWriteDto.getReview_place());
        return review;
    }
}
