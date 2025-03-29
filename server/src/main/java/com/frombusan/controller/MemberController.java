package com.frombusan.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


import com.frombusan.dto.request.FindIdDto;
import com.frombusan.dto.request.FindPwDto;
import com.frombusan.dto.request.UpdateMemberDto;
import com.frombusan.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.frombusan.model.course.Course;
import com.frombusan.model.festival.Festival;
import com.frombusan.model.member.LoginForm;
import com.frombusan.model.member.Member;
import com.frombusan.model.tourist.Tourist_Spot;
import com.frombusan.repository.CourseMapper;
import com.frombusan.repository.FestivalMapper;
import com.frombusan.repository.MemberMapper;
import com.frombusan.repository.TouristMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("member")
@RestController
public class MemberController {
	
	private final MemberService memberService;
    private final MemberMapper memberMapper;
	private final FestivalMapper festivalMapper;
	private final TouristMapper touristMapper;
	private final CourseMapper courseMapper;

	//아이디 중복확인
	@GetMapping("idCheck/{id}")
	public ResponseEntity<Boolean> idCheck(@PathVariable(value = "id") String memberId) {
		boolean result = memberService.idCheck(memberId);
		return ResponseEntity.ok(result);
	}

	//아이디 찾기
	@GetMapping("findId")
	public ResponseEntity<String> findId(@RequestBody FindIdDto findIdDto) {
		String result = memberService.findId(findIdDto);
		return ResponseEntity.ok(result);
	}

	//비밀번호 찾기
	@PostMapping("findPw")
	public ResponseEntity<String> findPw(@RequestBody FindPwDto findPwDto){
		String result = memberService.findPw(findPwDto);
		return ResponseEntity.ok(result);
	}

	@PostMapping("updateMember")
	public ResponseEntity<String> updateMember(@RequestBody UpdateMemberDto updateMemberDto,
							@SessionAttribute(value = "loginMember") Member loginMember) {
		memberService.updateMember(updateMemberDto,loginMember);
		return ResponseEntity.ok("변경성공");
	}

    @GetMapping("jjimList")
    public String myList(@Validated @ModelAttribute("loginForm") LoginForm loginForm
                        ,@SessionAttribute(value = "loginMember", required = false) Member loginMember
                        ,Model model) {

    	//명소 찜 목록 **서비스 처리 필요
    	List<Map<String, Object>> resultList = touristMapper.findMyListByMemberId(loginMember.getMember_id());
    	List<Tourist_Spot> findMyListSpots = new ArrayList<>();

    	for (int i = 0; i < resultList.size(); i++) {
		    Object idObj = resultList.get(i).get("TOURIST_SPOT_ID");
		    Long touristSpotid = ((Number) idObj).longValue(); // id가 Number 타입일 수도 있으므로 longValue()로 Long 타입으로 변환
		    Tourist_Spot touristSpot= touristMapper.findTouristSpot(touristSpotid);
		    findMyListSpots.add(touristSpot);
    	}
    	//log.info("count : {}",findMyListSpots.size());
    	model.addAttribute("findMyListSpots", findMyListSpots);


    	//축제 찜 목록  **서비스 처리 필요
    	List<Map<String, Object>> resultList2 = festivalMapper.findMyListByMemberId(loginMember.getMember_id());
    	List<Festival> findMyListFes = new ArrayList<>();

    	for (int i = 0; i < resultList2.size(); i++) {
		    Object idObj2 = resultList2.get(i).get("FESTIVAL_ID");
		    Long festival_id = ((Number) idObj2).longValue(); // id가 Number 타입일 수도 있으므로 longValue()로 Long 타입으로 변환
		    Festival festival= festivalMapper.findFestival(festival_id);
		    findMyListFes.add(festival);
    	}
    	//log.info("count : {}",findMyListFes.size());
    	model.addAttribute("findMyListFes", findMyListFes);


    	//코스 찜 목록 **서비스 처리 필요
    	List<Map<String, Object>> resultList3 = courseMapper.findMyListByMemberId(loginMember.getMember_id());
    	List<Course> findMyListCos = new ArrayList<>();

    	for (int i = 0; i < resultList3.size(); i++) {
		    Object idObj3 = resultList3.get(i).get("COURSE_ID");
		    Long courseId = ((Number) idObj3).longValue(); // id가 Number 타입일 수도 있으므로 longValue()로 Long 타입으로 변환
		    Course course= courseMapper.findCourse(courseId);
		    findMyListCos.add(course);
    	}
    	//log.info("count : {}",findMyListCos.size());
    	model.addAttribute("findMyListCos", findMyListCos);
    	model.addAttribute("loginMember",loginMember.getMember_id());

        return "member/myJjimList"  ;
    }

}
