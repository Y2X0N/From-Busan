package com.frombusan.model.review;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
public class ReviewWriteForm {
	  	@NotBlank(message = "제목을 입력해주세요.")
	    private String title;

	    @NotBlank(message = "내용을 입력해주세요.")
	    private String contents;

	    @NotBlank(message = "장소를 입력해주세요.")
	    private String review_place;

	    public static Review toReview(ReviewWriteForm reviewWriteForm) {
    	Review review = new Review();
    	review.setTitle(reviewWriteForm.getTitle());
    	review.setContents(reviewWriteForm.getContents());
    	review.setReview_place(reviewWriteForm.getReview_place());
        return review;
	    }
}
