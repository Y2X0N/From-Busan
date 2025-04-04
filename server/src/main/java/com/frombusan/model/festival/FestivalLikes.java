package com.frombusan.model.festival;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class FestivalLikes {
	
	private Long like_id;
	private Long festival_id;
	private String member_id;
	private boolean liked;

}
