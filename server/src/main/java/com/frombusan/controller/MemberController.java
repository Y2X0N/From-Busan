package com.frombusan.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


import com.frombusan.dto.request.FindIdDto;
import com.frombusan.dto.request.FindPwDto;
import com.frombusan.dto.request.UpdateMemberDto;
import com.frombusan.dto.response.MyWishlist;
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
	//　마이찜리스트
    @GetMapping("wishlist")
    public ResponseEntity<MyWishlist> getMyWishlist(@SessionAttribute(value = "loginMember") Member loginMember) {
		MyWishlist myWishlist = memberService.getMyWishList(loginMember);
		return ResponseEntity.ok(myWishlist);
    }

}
