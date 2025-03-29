package com.frombusan.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePwDto {
    private String member_id;
    private String name;
    private String phone_number;
}
