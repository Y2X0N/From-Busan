package com.frombusan.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateMemberDto {
    private String name;
    private String password;
    private String phone_number;
}
