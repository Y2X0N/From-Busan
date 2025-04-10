package com.frombusan.model.review;

import lombok.Data;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;

@Data
public class Review {

    @NotBlank
    private Long review_id;
    @NotBlank
    private String member_id;
    private String title;
    private String contents;
    private Long hit;
    private Long review_like;
    private LocalDateTime created_time;
    @NotBlank
    private String review_place;

    public void addReview_like() {
        this.review_like++;
    }

    public void removeReview_like() {
        this.review_like--;
    }

    public void addHit() {
        this.hit++;
    }
}
