package com.frombusan.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewUpdateDto {
    private Long reviewId;
    private String memberId;
    private String title;
    private String contents;
}
