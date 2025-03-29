package com.frombusan.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.frombusan.model.member.Member;
import com.frombusan.model.member.findIdForm;


@Mapper
public interface MemberMapper {
    // 회원가입
    void saveMember(Member member);

    Member findMember(String member_id);

    List<String> findAllMemberId();
    
    //List<findIdForm> findIdOrPassword();
    
    void updateMember(Member updateMember);

    // 아이디 중복확인
    boolean idCheck(String member_id);
}
