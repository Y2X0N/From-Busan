package com.frombusan.dto.member;

import com.frombusan.model.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class JoinFormDto {

    private String member_id;
    private String password;
    private String name;
    private LocalDate birth;
    private String phone_number;

    public static Member toMember(JoinFormDto joinFormDto) {
        Member member = new Member();
        member.setMember_id(joinFormDto.getMember_id());
        member.setPassword(joinFormDto.getPassword());
        member.setName(joinFormDto.getName());
        member.setBirth(joinFormDto.getBirth());
        member.setPhone_number(joinFormDto.getPhone_number());
        return member;
    }

}
