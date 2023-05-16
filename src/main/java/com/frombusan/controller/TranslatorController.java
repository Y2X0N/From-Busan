package com.frombusan.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.modernmt.ModernMT;
import com.modernmt.model.Memory;
import com.modernmt.model.Translation;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("translate")
@Controller
public class TranslatorController {

	ModernMT mmt = new ModernMT("9F982625-12CF-5F66-37B2-D8B9A4B56415");
	
	@PostMapping("main")
    public ResponseEntity<List<Translation>> main(
           @RequestParam(value="fesMainTitle[]") List<String> fesMainTitle
           ,@RequestParam(value="tourMainTitle[]") List<String> tourMainTitle
    		,@RequestParam String lang) throws IOException {
		
		List<Translation> fesMainTitles = mmt.translate("ko",lang,fesMainTitle);
		List<Translation> tourMainTitles = mmt.translate("ko",lang,tourMainTitle);
		List<Translation> joined = new ArrayList<>();
		joined.addAll(fesMainTitles);
		joined.addAll(tourMainTitles);
        return ResponseEntity.ok(joined);
    }
	@PostMapping("maps")
	public ResponseEntity<Translation> mainMaps(@RequestParam(value="contents") String content
								,@RequestParam String lang) throws IOException {
			Translation contents  = mmt.translate("ko",lang,content);
			log.info("contents: {}",contents);
			//Translation joined = new Translation();
			//joined.add(contents);
	        return ResponseEntity.ok(contents);
	    }
	
	@PostMapping("reviewsList")

    public ResponseEntity<List<Translation>> list(@RequestParam String text1
           , @RequestParam(value="reviewPlaces[]",defaultValue="") List<String> reviewPlace
           , @RequestParam(value="reviewTitle[]",defaultValue="") List<String> reviewTitle
           , @RequestParam(value="mainTitle[]",defaultValue="") List<String> mainTitle
    		,@RequestParam String lang) throws IOException {
		
		List<Translation> joined = new ArrayList<>();
		
		if(!mainTitle.isEmpty()) {
		List<Translation> mainTitles = mmt.translate("ko",lang,mainTitle);
		joined.addAll(mainTitles);
		}
		List<Translation> reviewList = mmt.translate("ko", lang, Arrays.asList(text1));
		joined.addAll(reviewList);

		if(!reviewPlace.isEmpty()) {
		List<Translation> reviewPlaces = mmt.translate("ko",lang,reviewPlace);
		joined.addAll(reviewPlaces);
		}
		if(!reviewTitle.isEmpty()) {
		List<Translation> reviewTitles = mmt.translate("ko",lang,reviewTitle);
		joined.addAll(reviewTitles);
		}
        return ResponseEntity.ok(joined);
    }
	
	@PostMapping("tourInfo")
    public ResponseEntity<List<Translation>> tourInfo(@RequestParam String itemcntnts
    		,@RequestParam String lang
    		,@RequestParam String hldyInfo
    		,@RequestParam String usageAmount
    		,@RequestParam String trfcInfo
    		,@RequestParam String main_title
    		,@RequestParam String usage_day_week_and_time
    		) throws IOException {
		
		List<Translation> itemcntnt = mmt.translate("ko", lang, Arrays.asList(itemcntnts));
		List<Translation> hldyInfos = mmt.translate("ko", lang, Arrays.asList(hldyInfo));
		List<Translation> usage_day = mmt.translate("ko", lang, Arrays.asList(usage_day_week_and_time));
		List<Translation> usageAmounts = mmt.translate("ko", lang, Arrays.asList(usageAmount));
		List<Translation> trfcInfos = mmt.translate("ko", lang, Arrays.asList(trfcInfo));
		List<Translation> main_titles = mmt.translate("ko", lang, Arrays.asList(main_title));
		List<Translation> joined = new ArrayList<>();
		joined.addAll(itemcntnt);
		joined.addAll(hldyInfos);
		joined.addAll(usage_day);
		joined.addAll(usageAmounts);
		joined.addAll(trfcInfos);
		joined.addAll(main_titles);
		
        return ResponseEntity.ok(joined);
    }

	
	@PostMapping("fesInfo")
    public ResponseEntity<List<Translation>> fesInfo(@RequestParam String itemcntnts
    		,@RequestParam String lang
    		,@RequestParam String middle_size_rm1
    		,@RequestParam String usageAmount
    		,@RequestParam String main_title
    		,@RequestParam String trfcInfo
    		) throws IOException {
		
		List<Translation> itemcntnt = mmt.translate("ko", lang, Arrays.asList(itemcntnts));
		List<Translation> middle_size = mmt.translate("ko", lang, Arrays.asList(middle_size_rm1));
		List<Translation> usageAmounts = mmt.translate("ko", lang, Arrays.asList(usageAmount));
		List<Translation> trfcInfos = mmt.translate("ko", lang, Arrays.asList(trfcInfo));
		List<Translation> main_titles = mmt.translate("ko", lang, Arrays.asList(main_title));
		List<Translation> joined = new ArrayList<>();
		joined.addAll(itemcntnt);
		joined.addAll(usageAmounts);
		joined.addAll(trfcInfos);
		joined.addAll(middle_size);
		joined.addAll(main_titles);
		
        return ResponseEntity.ok(joined);
    }
	
	
	@PostMapping("Lists")//명소*축제 리스트
    public ResponseEntity<List<Translation>> lists(
           @RequestParam(value="itemcntnts[]", defaultValue="") List<String> itemcntnts
           , @RequestParam(value="main_title[]", defaultValue="") List<String> main_title
           , @RequestParam(value="searchName[]", defaultValue="") List<String> searchName
    		,@RequestParam String lang) throws IOException {
		List<Translation> joined = new ArrayList<>();
		
		if(!searchName.isEmpty()) {
			List<Translation> searchNames = mmt.translate("ko",lang,searchName);
			joined.addAll(searchNames);
		}
		if(!main_title.isEmpty()) {
		List<Translation> mainTitle = mmt.translate("ko",lang,main_title);
		joined.addAll(mainTitle);
		}
		if(!itemcntnts.isEmpty()) {
			List<Translation> itemcntnt = mmt.translate("ko",lang,itemcntnts);
			joined.addAll(itemcntnt);
			}
        return ResponseEntity.ok(joined);
    }
	
	@PostMapping("replyList")	//게시글 읽기
    public ResponseEntity<List<Translation>> replyList(
    		@RequestParam(value="reply[]", defaultValue="") List<String> reply
    		,@RequestParam String lang
    		,@RequestParam(defaultValue="") String title
    		,@RequestParam String review_place
    		,@RequestParam(defaultValue="") String time
    		,@RequestParam(defaultValue="") String contents
    		) throws IOException {
		List<Translation> review_places = mmt.translate("ko", lang, Arrays.asList(review_place));
		List<Translation> joined = new ArrayList<>();
		if(!reply.isEmpty()) {
		List<Translation> replys = mmt.translate("ko",lang,reply);
		joined.addAll(replys);
		}
		joined.addAll(review_places);
		if(!title.isEmpty()) {
		List<Translation> titles = mmt.translate("ko", lang, Arrays.asList(title));
		joined.addAll(titles);
		}
		if(!time.isEmpty()) {
		List<Translation> times = mmt.translate("ko", lang, Arrays.asList(time));
		joined.addAll(times);
		}
		if(!contents.isEmpty()) {
		List<Translation> content = mmt.translate("ko", lang, Arrays.asList(contents));
		joined.addAll(content);
		}
        return ResponseEntity.ok(joined);
    }
	
	
	
	@PostMapping("cosInfo")//코스 설명페이지
    public ResponseEntity<List<Translation>> cosInfo(
           @RequestParam(value="infoTitle[]") List<String> infoTitle
           , @RequestParam(value="content[]") List<String> content
    		,@RequestParam String lang
    		,@RequestParam String title
    		,@RequestParam String sequense
    		) throws IOException {
		
		List<Translation> titles = mmt.translate("ko", lang, Arrays.asList(title));
		List<Translation> sequenses = mmt.translate("ko", lang, Arrays.asList(sequense));
		List<Translation> mainTitles = mmt.translate("ko",lang,infoTitle);
		List<Translation> contents = mmt.translate("ko",lang,content);
		List<Translation> joined = new ArrayList<>();
		joined.addAll(titles);
		joined.addAll(sequenses);
		joined.addAll(mainTitles);
		joined.addAll(contents);
        return ResponseEntity.ok(joined);
    }
	

	

}
