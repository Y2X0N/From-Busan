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
public class ReviewListDto {

    List<Review> reviews;
    List<String> findAllName;
    private PageNavigator navi;

    public static final int countPerPage = 10;
    public static final int pagePerGroup = 5;


}
