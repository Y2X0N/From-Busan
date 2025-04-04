package com.frombusan.service;

import java.util.List;

import com.frombusan.dto.response.FestivalInfoDto;
import com.frombusan.dto.response.FestivalListDto;
import com.frombusan.model.festival.FestivalLikes;
import com.frombusan.model.festival.FestivalMyList;
import com.frombusan.model.member.Member;
import com.frombusan.util.PageNavigator;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.frombusan.model.festival.Festival;
import com.frombusan.repository.FestivalMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.thymeleaf.util.StringUtils;

import static com.frombusan.dto.response.FestivalListDto.countPerPage;
import static com.frombusan.dto.response.FestivalListDto.pagePerGroup;

@Slf4j
@RequiredArgsConstructor
@Service
public class FestivalService {

    private final FestivalMapper festivalMapper;

    @Transactional
    public List<Festival> findAllFestivalForMain(){
        return festivalMapper.findAllFestivalForMain();
    }

    @Transactional
    public FestivalListDto getList(String searchText, int page) {
        int total = festivalMapper.getTotal(searchText);
        PageNavigator navi = new PageNavigator(countPerPage, pagePerGroup, page, total);
        List<Festival> festivals = findFestivals(searchText, navi.getStartRecord(), navi.getCountPerPage());
        FestivalListDto list = new FestivalListDto(festivals, navi);

        return list;
    }

    public FestivalInfoDto findFestivalById(Long festivalId, Member loginMember) {
        try{
            Festival festival = festivalMapper.findFestival(festivalId);
            festival.addHit();
            festivalMapper.updateFestival(festival);

            Boolean isFavorite = null;
            Boolean isWishList = null;

            if(checkLoginMember(loginMember)){
                isFavorite = festivalMapper.checkMemberLikeStatus(festivalId, loginMember.getMember_id());
                isWishList = festivalMapper.checkMemberWishListStatus(festivalId, loginMember.getMember_id());
            }
            FestivalInfoDto festivalInfoDto = new FestivalInfoDto(festival, isFavorite, isWishList);
            return festivalInfoDto;
        } catch(Exception e){
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public Boolean toggleLike(Long festivalId, Member loginMember) {

        if(!checkLoginMember(loginMember)){
            throw new RuntimeException();
        }

        Festival findedFestival = festivalMapper.findFestival(festivalId);
        if(findedFestival == null) {
            throw new RuntimeException();
        }

        boolean isFavorite = festivalMapper.checkMemberLikeStatus(festivalId, loginMember.getMember_id());
        if(isFavorite) {
            findedFestival.removePlace_like();
            festivalMapper.updateFestival(findedFestival);

            FestivalLikes festivalLikes = festivalMapper.findFestivalLike(festivalId, loginMember.getMember_id());
            festivalMapper.deleteLike(festivalLikes);
            return false;
        } else {
            findedFestival.addPlace_like();
            festivalMapper.updateFestival(findedFestival);

            FestivalLikes festivalLikes = new FestivalLikes();
            festivalLikes.setFestival_id(festivalId);
            festivalLikes.setMember_id(loginMember.getMember_id());
            festivalMapper.saveLikes(festivalLikes);
            return true;
        }
    }

    @Transactional
    public Boolean toggleWishlist(Long festivalId, Member loginMember) {

        if(!checkLoginMember(loginMember)) {
            throw new RuntimeException();
        }

        Festival findedFestival = festivalMapper.findFestival(festivalId);
        if(findedFestival == null) {
            throw new RuntimeException();
        }

        boolean isWishList = festivalMapper.checkMemberWishListStatus(festivalId, loginMember.getMember_id());
        if(isWishList){
            findedFestival.removeWishList();
            festivalMapper.updateFestival(findedFestival);

            FestivalMyList festivalMyList = festivalMapper.findFestivalMyList(festivalId, loginMember.getMember_id());
            festivalMapper.deleteMyList(festivalMyList);
            return false;
        }else {
            findedFestival.addWishList();
            festivalMapper.updateFestival(findedFestival);

            FestivalMyList festivalMyList = new FestivalMyList();
            festivalMyList.setFestival_id(festivalId);
            festivalMyList.setMember_id(loginMember.getMember_id());
            festivalMapper.saveMyList(festivalMyList);
            return true;
        }
    }


    private List<Festival> findFestivals(String searchText, int startRecord, int countPerPage) {
        // 전체 검색 결과 중 시작 위치와 갯수
        RowBounds rowBounds = new RowBounds(startRecord, countPerPage);
        return festivalMapper.findAllFestival(searchText, rowBounds);
    }

    private Boolean checkLoginMember(Member loginMember){
        return loginMember != null && !StringUtils.isEmpty(loginMember.getMember_id());
    }
}
