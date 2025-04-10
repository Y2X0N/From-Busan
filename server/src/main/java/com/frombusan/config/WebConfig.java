package com.frombusan.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.frombusan.interceptor.LoginCheckInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// 모든 경로에 대해 CORS 허용
		registry.addMapping("/**").allowedOrigins("http://localhost:5173").allowCredentials(true).allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
	}

	//url
    private String[] excludePaths = {"/", "/js/**","/member/join",
    		"/member/login", "/member/logout", "/css/**","/member/","/member/idCheck",
    		"/*.ico", "/error","/image/**","/member/findId","/member/findPassword",
        "/member/**","/festival/**","/tourist/**","/restaurant/**","/review/reviewList","/review/list"
    		,"/review/read/**"//,"/translate/tourInfo","/translate/fesInfo"
    		,"/festival/list?","/review/list?","/reply/**",
    		"/translate/**","/course/**"};

	/*
	 * @Override public void addInterceptors(InterceptorRegistry registry) { //
	 * 인터셉터를 등록한다. registry.addInterceptor(new LogInceptor()) // 인터셉터의 호출 순서를 지정.
	 * 낮을수록 먼저 호출된다. .order(1) // 인터셉터를 적용할 URL 패턴을 지정 .addPathPatterns("/**") //
	 * 인터셉터에서 제외할 패턴을 .excludePathPatterns("/css/**", "/*.ico", "/error");
	 * 
	 * 
	 * registry.addInterceptor(new LoginCheckInterceptor()) .order(2)
	 * .addPathPatterns("/**") .excludePathPatterns(excludePaths); }
	 */
  
//  @Override
//  public void addInterceptors(InterceptorRegistry registry) {
//      // 인터셉터를 등록한다.
////      registry.addInterceptor(new LogInceptor())
////              // 인터셉터의 호출 순서를 지정. 낮을수록 먼저 호출된다.
////              .order(1)
////              // 인터셉터를 적용할 URL 패턴을 지정
////              .addPathPatterns("/**")
////              // 인터셉터에서 제외할 패턴을 지정
////              .excludePathPatterns("/css/**", "/*.ico", "/error");
//
//      registry.addInterceptor(new LoginCheckInterceptor())
//              .order(2)
//              .addPathPatterns("/**")
//              .excludePathPatterns(excludePaths);
//
//  }


}


