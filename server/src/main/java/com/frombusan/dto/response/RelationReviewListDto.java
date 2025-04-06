package com.frombusan.dto.response;

import com.frombusan.model.review.Review;
import com.frombusan.util.PageNavigator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
public class RelationReviewListDto {
    private List<Review> reviews;
    private PageNavigator navi;
}
