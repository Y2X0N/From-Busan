package com.frombusan.service;

import java.util.List;

import com.frombusan.dto.FestivalListDto;
import com.frombusan.model.member.Member;
import com.frombusan.util.PageNavigator;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.frombusan.model.festival.Festival;
import com.frombusan.repository.FestivalMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static com.frombusan.dto.FestivalListDto.countPerPage;
import static com.frombusan.dto.FestivalListDto.pagePerGroup;

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

    public Festival findFestivalById(Long festivalId, Member loginMember) {


        Festival festival = festivalMapper.findFestival(festivalId);

        // board_id에 해당하는 게시글이 없으면 리스트로 리다이렉트 시킨다.
//		if (festival == null) {
//		}

        festival.addHit();
        festivalMapper.updateFestival(festival);

//		model.addAttribute("festival", festival);
//
//		List<String> findFestivalLikes = festivalMapper.findLikesMemberId(festival_id);
//		model.addAttribute("findFestivalLikes", findFestivalLikes);
//
//		List<String> findFestivalMyList = festivalMapper.findMyListMemberId(festival_id);
//		model.addAttribute("findFestivalMyList", findFestivalMyList);
//
//		if(loginMember!=null) {
//		model.addAttribute("member_id", loginMember.getMember_id());
//		}





        return festival;
    }

    private List<Festival> findFestivals(String searchText, int startRecord, int countPerPage) {
        // 전체 검색 결과 중 시작 위치와 갯수
        RowBounds rowBounds = new RowBounds(startRecord, countPerPage);
        return festivalMapper.findAllFestival(searchText, rowBounds);
    }
}
