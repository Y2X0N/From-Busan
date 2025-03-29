package com.frombusan.service;

import com.frombusan.dto.request.FindIdDto;
import com.frombusan.dto.request.FindPwDto;
import com.frombusan.dto.request.UpdateMemberDto;
import com.frombusan.model.member.Member;
import com.frombusan.repository.MemberMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MemberService {

    @Autowired
    MemberMapper memberMapper;

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
}
