package com.frombusan.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.frombusan.model.AttachedImg;
import com.frombusan.model.festival.Festival;
import com.frombusan.model.review.Review;
import com.frombusan.model.review.ReviewLikes;
import com.frombusan.model.tourist.Tourist_Spot;
import com.frombusan.repository.FestivalMapper;
import com.frombusan.repository.ReviewMapper;
import com.frombusan.repository.TouristSpotMapper;
import com.frombusan.util.FileService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class TouristService {

    private final TouristSpotMapper touristSpotMapper;


    @Transactional(readOnly = true)
    public List<Tourist_Spot> findAllTourist(String searchText, int startRecord, int countPerPage) {
        // 전체 검색 결과 중 시작 위치와 갯수
        RowBounds rowBounds = new RowBounds(startRecord, countPerPage);
        return touristSpotMapper.findAllTourist(searchText, rowBounds);
    }

    public List<Tourist_Spot> findAllTouristForMain() {
        return touristSpotMapper.findAllTouristForMain();
    }

   
    
}
