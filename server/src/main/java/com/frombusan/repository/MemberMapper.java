package com.frombusan.repository;

import java.util.List;

import com.frombusan.dto.request.FindIdDto;
import com.frombusan.dto.request.FindPwDto;
import org.apache.ibatis.annotations.Mapper;

import com.frombusan.model.member.Member;


@Mapper
public interface MemberMapper {
    // 회원가입
    void saveMember(Member member);

    Member findMember(String member_id);

    List<String> findAllMemberId();

    // 아이디 중복확인
    boolean idCheck(String member_id);

    //아이디 찾기
    String findId(FindIdDto findIdDto);

    //비밀번호 찾기
    String findPw(FindPwDto findPwDto);

    //멤버 정보변경
    void updateMember(Member updateMember);
}
