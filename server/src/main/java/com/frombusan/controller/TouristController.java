package com.frombusan.controller;

import java.util.List;
import java.util.Map;

import com.frombusan.dto.TouristListDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.frombusan.model.member.Member;
import com.frombusan.model.tourist.TouristSpotLikes;
import com.frombusan.model.tourist.TouristSpotMyList;
import com.frombusan.model.tourist.Tourist_Spot;
import com.frombusan.service.TouristService;
import com.frombusan.util.PageNavigator;

import lombok.extern.slf4j.Slf4j;

import static com.frombusan.dto.TouristListDto.countPerPage;
import static com.frombusan.dto.TouristListDto.pagePerGroup;

@Slf4j
@RequestMapping("tourist")
@RestController
public class TouristController {

    @Autowired
    private TouristService touristService;

    @GetMapping("list")
    public ResponseEntity<TouristListDto> getList(@RequestParam(value = "page", defaultValue = "1") int page,
                                                  @RequestParam(value = "searchText", defaultValue = "") String searchText) {

        int total = touristService.getTotal(searchText);

        PageNavigator navi = new PageNavigator(countPerPage, pagePerGroup, page, total);

        List<Tourist_Spot> findAllTourist = touristService.findAllTourist(searchText, navi.getStartRecord(), navi.getCountPerPage());

        List<Tourist_Spot> searchTour = touristService.findAllTourist();

        //이건 필요없을수도..일단 남겨둠
        //model.addAttribute("searchText", searchText);

        TouristListDto touristListDto = new TouristListDto(findAllTourist,searchTour,navi);

        return ResponseEntity.ok(touristListDto);
    }

    // 게시글 읽기
    @GetMapping("/TouristInfo")
    public String read(@RequestParam("tourist_Spot_id") Long tourist_Spot_id, @SessionAttribute(value = "loginMember", required = false) Member loginMember,
                       Model model) {
        Tourist_Spot tourist_Spot = touristMapper.findTouristSpot(tourist_Spot_id);


        if (tourist_Spot == null) {
            log.info("명소 없음");
            return "redirect:/tourist_Spot/list";
        }
        tourist_Spot.addHit();
        touristMapper.addHit(tourist_Spot);

        model.addAttribute("tourist_Spot", tourist_Spot);
        List<String> findTouristSpotLikes = touristMapper.findLikesMemberId(tourist_Spot_id);
        model.addAttribute("findTouristSpotLikes", findTouristSpotLikes);

        List<String> findTouristSpotMyList = touristMapper.findMyListMemberId(tourist_Spot_id);
        model.addAttribute("findTouristSpotMyList", findTouristSpotMyList);

        if (loginMember != null) {
            model.addAttribute("member_id", loginMember.getMember_id());
        }


        // board/read.html 를 찾아서 리턴한다.
        return "/tourist/TouristSpotInfo";
    }

    @PostMapping("/like")
    public ResponseEntity<Tourist_Spot> likeTouristSpot(@RequestParam("touristSpotId") Long tourist_Spot_id
            , @SessionAttribute(value = "loginMember", required = false) Member loginMember
    ) {

        List<String> findTouristSpotLikes = touristMapper.findLikesMemberId(tourist_Spot_id);
        List<Map<String, Object>> findLikesById = touristMapper.findLikesById(tourist_Spot_id);

        Tourist_Spot touristSpot = touristMapper.findTouristSpot(tourist_Spot_id);
        TouristSpotLikes touristSpotLike = new TouristSpotLikes();
        String member_id = loginMember.getMember_id();

        Object like_id = null;
        for (int i = 0; i < findLikesById.size(); i++) {
            Map<String, Object> map = findLikesById.get(i);
            if (member_id.equals((String) map.get("MEMBER_ID"))) {
                like_id = map.get("LIKE_ID");
                break;
            }
        }
        if (touristSpot != null) {
            if (!findTouristSpotLikes.contains(member_id)) {
                touristSpot.addPlace_like();
                touristSpotLike.setMember_id(member_id);
                touristSpotLike.setTourist_Spot_id(tourist_Spot_id);
                touristMapper.saveLikes(touristSpotLike);
                touristSpot.setLiked(true);
            } else {
                touristSpot.removePlace_like();
                touristMapper.deleteLike(like_id);
                touristSpot.setLiked(false);
            }
            touristMapper.updateTourist(touristSpot);
            return ResponseEntity.ok(touristSpot);
        } else {
            // 관광지 정보가 없는 경우, 오류 응답을 반환합니다.
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/myList")
    public ResponseEntity<Tourist_Spot> myTouristSpot(@RequestParam("touristSpotId") Long tourist_Spot_id
            , @SessionAttribute(value = "loginMember", required = false) Member loginMember
    ) {

        List<String> findTouristSpotMyList = touristMapper.findMyListMemberId(tourist_Spot_id);
        List<Map<String, Object>> findMyListById = touristMapper.findMyListById(tourist_Spot_id);
        Tourist_Spot touristSpot = touristMapper.findTouristSpot(tourist_Spot_id);


        TouristSpotMyList touristSpotMyList = new TouristSpotMyList();
        String member_id = loginMember.getMember_id();


        Object wishboard_id = null;
        for (int i = 0; i < findMyListById.size(); i++) {
            Map<String, Object> map = findMyListById.get(i);
            if (member_id.equals((String) map.get("MEMBER_ID"))) {
                wishboard_id = map.get("WISHBOARD_ID");
                break;
            }
        }
        if (touristSpot != null) {
            if (!findTouristSpotMyList.contains(member_id)) {
                touristSpot.addWishList();
                touristSpotMyList.setMember_id(member_id);
                touristSpotMyList.setTourist_Spot_id(tourist_Spot_id);
                touristMapper.saveMyList(touristSpotMyList);
                touristSpot.setJjim(true);
            } else {
                touristSpot.removeWishList();
                touristMapper.deleteMyList(wishboard_id);
                touristSpot.setJjim(false);
            }

            return ResponseEntity.ok(touristSpot);
        } else {
            // 관광지 정보가 없는 경우, 오류 응답을 반환합니다.
            return ResponseEntity.badRequest().build();
        }
    }

}
