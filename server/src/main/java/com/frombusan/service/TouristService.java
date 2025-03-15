package com.frombusan.service;

import java.util.List;

import com.frombusan.dto.TouristInfoDto;
import com.frombusan.dto.TouristListDto;
import com.frombusan.model.member.Member;
import com.frombusan.util.PageNavigator;
import org.apache.ibatis.session.RowBounds;
import org.codehaus.groovy.util.StringUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.frombusan.model.tourist.Tourist_Spot;
import com.frombusan.repository.TouristMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.thymeleaf.util.StringUtils;

@Slf4j
@RequiredArgsConstructor
@Service
public class TouristService {

    private final TouristMapper touristMapper;

    public List<Tourist_Spot> findAllTouristForMain() {
        return touristMapper.findAllTouristForMain();
    }

    @Transactional
    public TouristInfoDto getTouristById(Long touristSpotId, Member loginMember) {
        try {
            Tourist_Spot findTouristSpot = touristMapper.findTouristSpot(touristSpotId);
            //조회수 증가
            findTouristSpot.addHit();
            touristMapper.addHit(findTouristSpot);

            Boolean isFavorite = null;
            Boolean isWishList = null;

            if (loginMember != null && !StringUtils.isEmpty(loginMember.getMember_id())) {
                isFavorite = touristMapper.checkMemberLikeStatus(touristSpotId, loginMember.getMember_id());
                isWishList = touristMapper.checkMemberWishListStatus(touristSpotId, loginMember.getMember_id());
            }

            return new TouristInfoDto(findTouristSpot,isFavorite,isWishList);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

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

}
