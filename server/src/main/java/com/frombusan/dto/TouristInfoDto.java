package com.frombusan.dto;

import com.frombusan.model.tourist.Tourist_Spot;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TouristInfoDto {
    Tourist_Spot touristSpot;
    Boolean isFavorite;
    Boolean isWishList;
}
