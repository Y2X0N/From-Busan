package com.frombusan.dto.tourist;

import com.frombusan.model.tourist.Tourist_Spot;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TouristInfoLikeDto {
    Tourist_Spot touristSpot;
    boolean isFavorite;
}
