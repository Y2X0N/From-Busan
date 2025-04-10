package com.frombusan.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.frombusan.model.board.Reply;
import com.frombusan.model.board.ReplyDto;
import com.frombusan.model.member.Member;
import com.frombusan.repository.ReplyMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("reply")
@RestController
public class ReplyRestController {
	
	private final ReplyMapper replyMapper;
	
	// 리플 등록
	@PostMapping("{review_id}")
	public ResponseEntity<String> writeReply(@PathVariable Long review_id,
											 @RequestBody Reply reply,
											 @SessionAttribute("loginMember") Member loginMember) {
		log.info("reply: {}", reply);
		reply.setReview_id(review_id);
		reply.setMember_id(loginMember.getMember_id());
		
		replyMapper.saveReply(reply);
		
		return ResponseEntity.ok("등록 성공");
	}
	
	// 리플 읽기 (/reply/게시물아이디/리플아이디)
	@GetMapping("{review_id}/{reply_id}")
	public ResponseEntity<Reply> findReply(@PathVariable Long review_id,
										   @PathVariable Long reply_id) {
		Reply reply = null;
		return ResponseEntity.ok(reply);
	}
	
	// 리플 목록
	@GetMapping("{review_id}")
	public ResponseEntity<List<ReplyDto>> findReplies(@SessionAttribute(name="loginMember", required=false) Member loginMember,
												   	  @PathVariable Long review_id) {
		List<Reply> replies = replyMapper.findReplies(review_id);

	    List<ReplyDto> replyDtos = new ArrayList<>();
	    if (replies != null && replies.size() > 0) {
	        for (Reply reply : replies) {
	            ReplyDto replyDto = Reply.toDto(reply);
	            // 로그인하지 않은 사용자일 경우 writer를 false로 설정합니다.
	            if (loginMember == null || !reply.getMember_id().equals(loginMember.getMember_id())) {
	                replyDto.setWriter(false);
	            } else {
	                replyDto.setWriter(true);
	            }
	            replyDtos.add(replyDto);
	        }
	    }

	    return ResponseEntity.ok(replyDtos);
	}
		
	// 리플 수정
	@PutMapping("{review_id}/{reply_id}")
	public ResponseEntity<Reply> updateReply(@SessionAttribute("loginMember") Member loginMember, @PathVariable Long review_id,
											 @PathVariable Long reply_id,
											 @RequestBody Reply reply) {
		
		// 수정 권한 확인
        Reply findReply = replyMapper.findReply(reply_id);
        if (findReply.getMember_id().equals(loginMember.getMember_id())) {
            replyMapper.updateReply(reply);
        }
		
		return ResponseEntity.ok(reply);
	}
	
	// 리플 삭제
	@DeleteMapping("{review_id}/{reply_id}")
	public ResponseEntity<String> removeReply(@SessionAttribute("loginMember") Member loginMember, @PathVariable Long review_id,
											  @PathVariable Long reply_id) {
		 // 삭제 권한 확인
        Reply findReply = replyMapper.findReply(reply_id);
        if (findReply.getMember_id().equals(loginMember.getMember_id())) {
            replyMapper.removeReply(reply_id);
        }
		return ResponseEntity.ok("삭제 성공");
	}
}










