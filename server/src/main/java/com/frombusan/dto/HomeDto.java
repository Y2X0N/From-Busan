package com.frombusan.dto;

import com.frombusan.model.festival.Festival;
import com.frombusan.model.tourist.Tourist_Spot;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class HomeDto {

    private List<Tourist_Spot> touristSpotList;

    private List<Festival> festivalList;

    public HomeDto(List<Tourist_Spot> touristSpotList, List<Festival> festivalList) {
        this.touristSpotList = touristSpotList;
        this.festivalList = festivalList;
    }
}
