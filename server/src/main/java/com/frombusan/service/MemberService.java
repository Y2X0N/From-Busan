package com.frombusan.service;

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


}
