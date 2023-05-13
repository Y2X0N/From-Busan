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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.modernmt.ModernMT;
import com.modernmt.model.Memory;
import com.modernmt.model.Translation;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class TranslatorController {

	ModernMT mmt = new ModernMT("9F982625-12CF-5F66-37B2-D8B9A4B56415");

	@PostMapping("/translate")
    public ResponseEntity<List<Translation>> translate(Model model
    		,@RequestParam String text1
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
}
