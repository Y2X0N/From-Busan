package com.frombusan.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.frombusan.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.frombusan.model.course.Course;
import com.frombusan.model.festival.Festival;
import com.frombusan.model.member.LoginForm;
import com.frombusan.model.member.Member;
import com.frombusan.model.member.findIdForm;
import com.frombusan.model.tourist.Tourist_Spot;
import com.frombusan.repository.CourseMapper;
import com.frombusan.repository.FestivalMapper;
import com.frombusan.repository.MemberMapper;
import com.frombusan.repository.ReviewMapper;
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

	@GetMapping("idCheck/{id}")
	public ResponseEntity<Boolean> idCheck(@PathVariable(value = "id") String memberId) {
		boolean result = memberService.idCheck(memberId);
		return ResponseEntity.ok(result);
	}

	//id*비번찾기(위한 정보)
//	@PostMapping("")
//	public ResponseEntity<List<findIdForm>> findIdOrPassword(
//	) {
//		List<findIdForm> findIdOrPassword = memberMapper.findIdOrPassword();
//		return ResponseEntity.ok(findIdOrPassword);
//	}

	//비번 변경
	@PostMapping("changePassword")
	public ResponseEntity<String> changePassword2(@RequestParam("member_id") String member_id
			,@RequestParam("password")String password, Model model ) {

		log.info("member_id:{}",member_id);
		// 사용자가 입력한 이이디에 해당하는 Member 정보를 데이터베이스에서 가져온다.
		Member member = memberMapper.findMember(member_id);
		member.setPassword(password);
		memberMapper.updateMember(member);

		return ResponseEntity.ok("변경성공");
	}

	@PostMapping("updateMember")
	public ResponseEntity<String> updateMember2(Model model
			,@RequestParam String name, @RequestParam String password, @RequestParam String phone_number
			,@SessionAttribute(value = "loginMember", required = false) Member loginMember) {


		loginMember.setPassword(password);
		loginMember.setName(name);
		loginMember.setPhone_number(phone_number);

		memberMapper.updateMember(loginMember);

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
