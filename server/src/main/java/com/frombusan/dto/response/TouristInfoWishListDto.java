package com.frombusan.dto.response;

import com.frombusan.model.tourist.Tourist_Spot;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TouristInfoWishListDto {
    Tourist_Spot touristSpot;
    boolean isWishList;
}
