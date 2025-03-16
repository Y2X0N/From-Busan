package com.frombusan.service;

import java.util.List;

import com.frombusan.dto.tourist.TouristInfoDto;
import com.frombusan.dto.tourist.TouristInfoLikeDto;
import com.frombusan.dto.tourist.TouristInfoWishListDto;
import com.frombusan.dto.tourist.TouristListDto;
import com.frombusan.model.member.Member;
import com.frombusan.model.tourist.TouristSpotLikes;
import com.frombusan.model.tourist.TouristSpotMyList;
import com.frombusan.util.PageNavigator;
import org.apache.ibatis.session.RowBounds;
import org.springframework.http.ResponseEntity;
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

    @Transactional(readOnly = true)
    public TouristListDto getList(String searchText, int page) {
        try {
            int total = touristMapper.getTotal(searchText);
            PageNavigator navi = new PageNavigator(TouristListDto.countPerPage, TouristListDto.pagePerGroup, page, total);
            List<Tourist_Spot> touristSpots = findAllTourist(searchText, navi.getStartRecord(), navi.getCountPerPage());
            return new TouristListDto(touristSpots, navi);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
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

            if (checkMember(loginMember)) {
                isFavorite = touristMapper.checkMemberLikeStatus(touristSpotId, loginMember.getMember_id());
                isWishList = touristMapper.checkMemberWishListStatus(touristSpotId, loginMember.getMember_id());
            }

            return new TouristInfoDto(findTouristSpot,isFavorite,isWishList);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     요청한 유저가 해당 명소를 좋아요했는지 판단 후
     * 좋아요를 했던 유저인경우 명소 좋아요 처리
     * 아닌 경우 명소 좋아요 삭제처리
     * @param touristSpotId 명소 상세 ID
     * @param loginMember 로그인 멤버
     * @return TouristInfoLikeDto
     */
    @Transactional
    public TouristInfoLikeDto toggleLike(Long touristSpotId, Member loginMember) {

        if (!checkMember(loginMember)) {
            //not exist member
            throw new RuntimeException();
        }

        Tourist_Spot findTouristSpot = touristMapper.findTouristSpot(touristSpotId);

        if(findTouristSpot == null ) {
            throw new RuntimeException();
        }

        boolean isFavorite = touristMapper.checkMemberLikeStatus(touristSpotId, loginMember.getMember_id());

        if (isFavorite) {
            findTouristSpot.removePlace_like();

            TouristSpotLikes findTouristSpotLike = touristMapper.findTouristSpotLike(touristSpotId, loginMember.getMember_id());
            touristMapper.deleteLike(findTouristSpotLike.getLike_id());
        } else {
            findTouristSpot.addPlace_like();

            TouristSpotLikes touristSpotLike = new TouristSpotLikes();
            touristSpotLike.setMember_id(loginMember.getMember_id());
            touristSpotLike.setTourist_Spot_id(touristSpotId);
            touristMapper.saveLikes(touristSpotLike);
        }

        touristMapper.updateTourist(findTouristSpot);

        TouristInfoLikeDto touristInfoLikeDto = new TouristInfoLikeDto();
        touristInfoLikeDto.setTouristSpot(findTouristSpot);
        touristInfoLikeDto.setFavorite(!isFavorite);
        return touristInfoLikeDto;
    }

    /**
     * 요청한 유저가 해당 명소를 찜했는지 판단 후
     * 찜을 했던 유저인경우 찜목록삭제처리
     * 아닌 경우 찜목록 추가
     *
     * @param touristSpotId 명소 상세 ID
     * @param loginMember 로그인 멤버
     * @return TouristInfoWishListDto
     */
    @Transactional
    public TouristInfoWishListDto toggleWishList(Long touristSpotId, Member loginMember) {

        if (!checkMember(loginMember)) {
            //not exist member
            throw new RuntimeException();
        }

        Tourist_Spot findTouristSpot = touristMapper.findTouristSpot(touristSpotId);

        if(findTouristSpot == null ) {
            throw new RuntimeException();
        }

        boolean isWishList = touristMapper.checkMemberWishListStatus(touristSpotId, loginMember.getMember_id());

        if (isWishList) {
            findTouristSpot.removeWishList();

            TouristSpotMyList findTouristSpotWishList = touristMapper.findTouristSpotWishList(touristSpotId, loginMember.getMember_id());
            touristMapper.deleteMyList(findTouristSpotWishList.getWishboard_id());
        } else {
            findTouristSpot.addWishList();

            TouristSpotMyList touristSpotMyList = new TouristSpotMyList();
            touristSpotMyList.setMember_id(loginMember.getMember_id());
            touristSpotMyList.setTourist_Spot_id(touristSpotId);
            touristMapper.saveMyList(touristSpotMyList);
        }
        touristMapper.updateTourist(findTouristSpot);

        TouristInfoWishListDto touristInfoWishListDto = new TouristInfoWishListDto();
        touristInfoWishListDto.setTouristSpot(findTouristSpot);
        touristInfoWishListDto.setWishList(!isWishList);
        return touristInfoWishListDto;

    }

    //로그인멤버 null 체크
    private boolean checkMember(Member loginMember) {
        return loginMember != null && !StringUtils.isEmpty(loginMember.getMember_id());
    }

    private List<Tourist_Spot> findAllTourist(String searchText, int startRecord, int countPerPage) {
        // 전체 검색 결과 중 시작 위치와 갯수
        RowBounds rowBounds = new RowBounds(startRecord, countPerPage);
        return touristMapper.findAllTourist(searchText, rowBounds);
    }


}
