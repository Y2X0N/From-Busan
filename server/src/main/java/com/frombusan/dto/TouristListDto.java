package com.frombusan.dto;

import com.frombusan.model.tourist.Tourist_Spot;
import com.frombusan.util.PageNavigator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class TouristListDto {

    private List<Tourist_Spot> findAllTourist;
    private List<Tourist_Spot> searchTour;
    private PageNavigator navi;

    public static final int countPerPage = 9;
    public static final int pagePerGroup = 5;

}
