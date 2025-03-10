package com.frombusan.model.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Data
public class MemberUpdateForm {
    
	@Size(min = 5, max = 10)
    private String member_id;
    
    @Size(min = 5, max = 10)
    private String password;
    
    @NotBlank
    private String name;
    
    @Past
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birth;
    
    private String phone_number;

    public static Member toMember(MemberUpdateForm memberUpdateForm) {
        Member member = new Member();
        member.setMember_id(memberUpdateForm.getMember_id());
        member.setPassword(memberUpdateForm.getPassword());
        member.setName(memberUpdateForm.getName());
        member.setBirth(memberUpdateForm.getBirth());
        member.setPhone_number(memberUpdateForm.getPhone_number());
        return member;
    }
}
