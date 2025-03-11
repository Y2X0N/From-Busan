package com.frombusan.service;

import java.util.List;

import com.frombusan.util.PageNavigator;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.frombusan.model.tourist.Tourist_Spot;
import com.frombusan.repository.TouristMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class TouristService {

    private final TouristMapper touristMapper;

    /**
     *  만약 search-condition이 null인 경우 전체 조회
     * @param searchText search-condition
     * @return search-condition 따른 관광 조회수
     * */
    public int getTotal(String searchText) {
        return touristMapper.getTotal(searchText);
    }

    public List<Tourist_Spot> findAllTourist() {
        return touristMapper.findAllTourist();
    }

    public List<Tourist_Spot> findAllTourist(String searchText, int startRecord, int countPerPage) {
        // 전체 검색 결과 중 시작 위치와 갯수
        RowBounds rowBounds = new RowBounds(startRecord, countPerPage);
        return touristMapper.findAllTourist(searchText, rowBounds);
    }



    public List<Tourist_Spot> findAllTouristForMain() {
        return touristMapper.findAllTouristForMain();
    }

   
    
}
