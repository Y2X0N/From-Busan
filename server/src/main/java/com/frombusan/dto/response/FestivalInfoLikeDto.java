package com.frombusan.dto.response;

import com.frombusan.model.festival.Festival;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FestivalInfoLikeDto {
    private Festival festival;
    private boolean favorite;
}
