package com.frombusan.config;

import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

import javax.servlet.Filter;
import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.frombusan.interceptor.LogInceptor;
import com.frombusan.interceptor.LoginCheckInterceptor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;


//import com.frombusan.filter.LogFilter;
//import com.frombusan.filter.LoginCheckFilter;
import com.frombusan.interceptor.LogInceptor;

import net.rakugakibox.util.YamlResourceBundle;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// 모든 경로에 대해 CORS 허용
		registry.addMapping("/**").allowedOrigins("http://localhost:5173");
	}

	//url
    private String[] excludePaths = {"/", "/js/**","/member/join",
    		"/member/login", "/member/logout", "/css/**","/member/","/member/idCheck",
    		"/*.ico", "/error","/image/**","/member/findId","/member/findPassword",
        "/member/**","/festival/**","/tourist/**","/restaurant/**","/review/reviewList","/review/list"
    		,"/review/read/**"//,"/translate/tourInfo","/translate/fesInfo"
    		,"/festival/list?","/review/list?","/reply/**",
    		"/translate/**","/course/**"};


//  @Bean
  public FilterRegistrationBean logFilter() {
      FilterRegistrationBean<Filter> filterFilterRegistrationBean = new FilterRegistrationBean<>();
      // 사용할 필터를 지정한다.
//      filterFilterRegistrationBean.setFilter(new LogFilter());
      // 필터의 순서. 낮을수록 먼저 동작한다.
      filterFilterRegistrationBean.setOrder(1);
      // 필터를 적용할 URL 패턴을 지정한다. 한번에 여러 패턴을 지정할 수 있다.
      filterFilterRegistrationBean.addUrlPatterns("/*");

      return filterFilterRegistrationBean;
  }

//  @Bean
  public FilterRegistrationBean loginCheckFilter() {
      FilterRegistrationBean<Filter> filterFilterRegistrationBean = new FilterRegistrationBean<>();
//      filterFilterRegistrationBean.setFilter(new LoginCheckFilter());
      filterFilterRegistrationBean.setOrder(2);
      filterFilterRegistrationBean.addUrlPatterns("/*");
      return filterFilterRegistrationBean;
  }

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
  
  @Override
  public void addInterceptors(InterceptorRegistry registry) {
      // 인터셉터를 등록한다.
//      registry.addInterceptor(new LogInceptor())
//              // 인터셉터의 호출 순서를 지정. 낮을수록 먼저 호출된다.
//              .order(1)
//              // 인터셉터를 적용할 URL 패턴을 지정
//              .addPathPatterns("/**")
//              // 인터셉터에서 제외할 패턴을 지정
//              .excludePathPatterns("/css/**", "/*.ico", "/error");

      registry.addInterceptor(new LoginCheckInterceptor())
              .order(2)
              .addPathPatterns("/**")
              .excludePathPatterns(excludePaths);
		registry.addInterceptor(localeChangeInterceptor())
				.excludePathPatterns("/resources/**", "/resources/", "/css/**", "/vendor/**", "/js/**", "/script/**", "/images/**", "/fonts/**", "/lib/**");

  }

  
  /**
	 * 변경된 언어 정보를 기억할 로케일 리졸버를 생성한다.
	 * 여기서는 세션에 저장하는 방식을 사용한다.
	 * @return
	 */
	@Bean
	public LocaleResolver localeResolver() {
		CookieLocaleResolver localeResolver = new CookieLocaleResolver() {
	        @Override
	        protected Locale determineDefaultLocale(HttpServletRequest request) {
	            String storedLang = request.getParameter("lang");
	            if (storedLang != null && !storedLang.isEmpty()) {
	                return new Locale(storedLang);
	            }
	            return super.determineDefaultLocale(request);
	        }
	    };
	    localeResolver.setDefaultLocale(Locale.ENGLISH);
	    localeResolver.setCookieName("localeCookie");
	    localeResolver.setCookieMaxAge(60 * 60 * 24 * 365); // 1 year
	    return localeResolver;
	}

	/**
	 * 언어 변경을 위한 인터셉터를 생성한다.
	 */
	@Bean
	public LocaleChangeInterceptor localeChangeInterceptor() {
		LocaleChangeInterceptor interceptor = new LocaleChangeInterceptor();
		interceptor.setParamName("lang");
		return interceptor;
	}



	/**
	 * 각 언어별 메시지 정보를 yaml-bundle을 통해 가져옴
	 */
	@Bean("messageSource")
	public MessageSource messageSource(@Value("${spring.config.messages.basename}") String basename, 
  					@Value("${spring.config.messages.encoding}") String encoding ) {

		YamlMessageSource source = new YamlMessageSource();
		source.setBasename(basename);
		source.setDefaultEncoding(encoding);
		source.setAlwaysUseMessageFormat(true);
		source.setUseCodeAsDefaultMessage(true);
		source.setFallbackToSystemLocale(false);
		return source;
	}

}


