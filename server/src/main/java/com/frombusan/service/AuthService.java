package com.frombusan.service;

import com.frombusan.dto.member.JoinFormDto;
import com.frombusan.model.member.Member;
import com.frombusan.model.member.MemberJoinForm;
import com.frombusan.repository.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthService {

    private final MemberMapper memberMapper;

    public void login(HttpServletRequest request,String memberId,String password) {
        // 사용자가 입력한 이이디에 해당하는 Member 정보를 데이터베이스에서 가져온다.
        Member member = memberMapper.findMember(memberId);
        // Member 가 존재하지 않거나 패스워드가 다르면
        if (member == null || !member.getPassword().equals(password)) {
            throw new RuntimeException();
        }
        // Request 객체에서 Session 객체를 꺼내온다.
        HttpSession session = request.getSession();
        // Session 에 'loginMember' 라는 이름으로 Member 객체를 저장한다.
        session.setAttribute("loginMember", member);
    }

    public void logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate(); // 세션 무효화
        }
    }

    @Transactional
    public void join(JoinFormDto joinFormDto) {
        // 사용자로부터 입력받은 아이디로 데이터베이스에서 Member 를 검색한다.
        Member member = memberMapper.findMember(joinFormDto.getMember_id());
        // 사용자 정보가 존재하면
        if (member != null) {
            throw new RuntimeException();
        }
        // MemberJoinForm 객체를 Member 타입으로 변환하여 데이터베이스에 저장한다.
        memberMapper.saveMember(JoinFormDto.toMember(joinFormDto));

    }
}
