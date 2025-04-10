package com.frombusan.service;

import com.frombusan.dto.request.FindIdDto;
import com.frombusan.dto.request.FindPwDto;
import com.frombusan.dto.request.UpdateMemberDto;
import com.frombusan.dto.response.MyWishlist;
import com.frombusan.model.festival.Festival;
import com.frombusan.model.member.Member;
import com.frombusan.model.review.Review;
import com.frombusan.model.tourist.Tourist_Spot;
import com.frombusan.repository.FestivalMapper;
import com.frombusan.repository.MemberMapper;
import com.frombusan.repository.ReviewMapper;
import com.frombusan.repository.TouristMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberMapper memberMapper;
    private final TouristMapper touristMapper;
    private final FestivalMapper festivalMapper;
    private final ReviewMapper reviewMapper;

    public boolean idCheck(String memberId) {
        log.info("아이디 중복 확인 , id = {}",memberId);
        return memberMapper.idCheck(memberId);
    }


    public String findPw(FindPwDto findPwDto) {
        String findPw = memberMapper.findPw(findPwDto);
        log.info("찾은 비밀번호 : {}", findPw);
        return findPw;
    }

    public String findId(FindIdDto findIdDto) {
        String findId = memberMapper.findId(findIdDto);
        log.info("찾은 아이디 : {} ", findId );
        return findId;
    }

    public void updateMember(UpdateMemberDto updateMemberDto, Member loginMember) {
        log.info("정보변경 , 아이디 : {} ", loginMember.getMember_id());
        loginMember.setName(updateMemberDto.getName());
        loginMember.setPassword(updateMemberDto.getPassword());
        loginMember.setPhone_number(updateMemberDto.getPhone_number());
        memberMapper.updateMember(loginMember);
    }

    @Transactional(readOnly = true)
    public MyWishlist getMyWishList(Member loginMember) {
        List<Tourist_Spot> findMyTouristSpotWishlist = touristMapper.findMyWishlistByMemberId(loginMember.getMember_id());
        List<Festival> findMyFestivalWishlist = festivalMapper.findMyWishlistByMemberId(loginMember.getMember_id());
        MyWishlist myWishlist = new MyWishlist();
        myWishlist.setTouristSpotList(findMyTouristSpotWishlist);
        myWishlist.setFestivalList(findMyFestivalWishlist);
        return myWishlist;
    }

    public List<Review> getMyReviewList(Member loginMember) {
        return reviewMapper.findReviewsByMemberId(loginMember.getMember_id());
    }

    public Member checkPw(String password, Member loginMember) {
        if(loginMember.getPassword().equals(password)) {
            return loginMember;
        } else {
            throw new RuntimeException();
        }
    }

}
