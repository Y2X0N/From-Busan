package com.frombusan.dto.response;

import com.frombusan.model.review.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewInfoDto {
    Review review;
    Boolean isFavorite;
}
