package com.frombusan.dto.response;

import com.frombusan.model.review.Review;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewLikeDto {
    Review review;
    boolean isFavorite;
}
