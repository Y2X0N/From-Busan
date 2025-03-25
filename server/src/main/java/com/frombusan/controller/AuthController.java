package com.frombusan.controller;

import com.frombusan.dto.request.JoinFormDto;
import com.frombusan.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("auth")
@RestController
public class AuthController {

    private final AuthService authService;

    @PostMapping("login")
    public ResponseEntity<String> login(HttpServletRequest request,
                                        @RequestParam("member_id") String memberId,
                                        @RequestParam("password") String password) {
        authService.login(request,memberId,password);
        return ResponseEntity.ok("로그인 성공");
    }

    @PostMapping("logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        authService.logout(request);
        return ResponseEntity.ok("로그아웃 성공");
    }

    // 회원가입
    @PostMapping("join")
    public ResponseEntity<String> join(@RequestBody JoinFormDto joinFormDto) {
        try {
            authService.join(joinFormDto);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok("회원가입 성공");
    }
}
