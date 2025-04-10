package com.frombusan.model.review;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class ReviewLikes {
	
	private Long like_id;
	private Long review_id;
	private String member_id;

}
