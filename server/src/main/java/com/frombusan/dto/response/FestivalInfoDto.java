package com.frombusan.dto;

import com.frombusan.model.festival.Festival;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FestivalInfoDto {
    private Festival festival;
    private Boolean isFavorite;
    private Boolean isWishList;
}
