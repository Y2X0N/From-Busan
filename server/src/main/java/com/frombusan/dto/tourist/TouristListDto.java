package com.frombusan.dto.tourist;

import com.frombusan.model.tourist.Tourist_Spot;
import com.frombusan.util.PageNavigator;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class TouristListDto {

    private List<Tourist_Spot> findAllTourist;
    private PageNavigator navi;

    public static final int countPerPage = 9;
    public static final int pagePerGroup = 5;

}
