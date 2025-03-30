package com.frombusan.dto.response;

import com.frombusan.model.festival.Festival;
import com.frombusan.model.tourist.Tourist_Spot;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MyWishlist {
    private List<Tourist_Spot> touristSpotList;
    private List<Festival> festivalList;
}
