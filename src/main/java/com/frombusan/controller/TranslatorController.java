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
@RestController
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
	
	
	@PostMapping("reviewsList")
    public ResponseEntity<List<Translation>> list(@RequestParam String text1
           , @RequestParam(value="reviewPlaces[]") List<String> reviewPlace
           , @RequestParam(value="reviewTitle[]") List<String> reviewTitle
    		,@RequestParam String lang) throws IOException {
		
		List<Translation> reviewList = mmt.translate("ko", lang, Arrays.asList(text1));
		List<Translation> reviewPlaces = mmt.translate("ko",lang,reviewPlace);
		List<Translation> reviewTitles = mmt.translate("ko",lang,reviewTitle);
		List<Translation> joined = new ArrayList<>();
		joined.addAll(reviewList);
		joined.addAll(reviewPlaces);
		joined.addAll(reviewTitles);
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
           @RequestParam(value="itemcntnts[]") List<String> itemcntnts
           , @RequestParam(value="main_title[]") List<String> main_title
    		,@RequestParam String lang) throws IOException {
		
		List<Translation> itemcntnt = mmt.translate("ko",lang,itemcntnts);
		List<Translation> mainTitle = mmt.translate("ko",lang,main_title);
		List<Translation> joined = new ArrayList<>();
		joined.addAll(mainTitle);
		joined.addAll(itemcntnt);
        return ResponseEntity.ok(joined);
    }
	
	@PostMapping("replyList")
    public ResponseEntity<List<Translation>> replyList(
           @RequestParam(value="reply[]") List<String> reply
    		,@RequestParam String lang
    		,@RequestParam String title
    		,@RequestParam String review_place
    		,@RequestParam String time
    		,@RequestParam String contents
    		) throws IOException {
		List<Translation> review_places = mmt.translate("ko", lang, Arrays.asList(review_place));
		List<Translation> titles = mmt.translate("ko", lang, Arrays.asList(title));
		List<Translation> content = mmt.translate("ko", lang, Arrays.asList(contents));
		List<Translation> times = mmt.translate("ko", lang, Arrays.asList(time));
		List<Translation> replys = mmt.translate("ko",lang,reply);
		List<Translation> joined = new ArrayList<>();
		joined.addAll(review_places);
		joined.addAll(titles);
		joined.addAll(times);
		joined.addAll(content);
		joined.addAll(replys);
        return ResponseEntity.ok(joined);
    }
	
	
	
}
