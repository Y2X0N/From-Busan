package com.frombusan.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import com.frombusan.model.festival.Festival;
import com.frombusan.model.festival.FestivalLikes;
import com.frombusan.model.festival.FestivalMyList;


@Mapper
public interface FestivalMapper {
	//홈화면축제리스트
	List<Festival> findAllFestivalForMain();
	//축제정보찾기
	Festival findFestival(Long festival_id);
	//축제페이징처리
	int getTotal(String searchText);
	List<Festival> findAllFestival(String searchText,RowBounds rowBounds);
	//회원의 좋아요 유무
	Boolean checkMemberLikeStatus(@Param("festival_id")Long festivalId, @Param("member_id")String memberId);
	//회원의 찜 유무
	Boolean checkMemberWishListStatus(@Param("festival_id")Long festivalId, @Param("member_id")String memberId);
	//회원의 좋아요 게시물찾기
	FestivalLikes findFestivalLike(@Param("festival_id")Long festivalId, @Param("member_id")String memberId);
	//회원의 찜 게시물 찾기
	FestivalMyList findFestivalMyList(@Param("festival_id")Long festivalId, @Param("member_id")String memberId);
	//회원의 좋아요 삭제
	void deleteLike(Object like_id);
	//회원의 찜 삭제
	void deleteMyList(Object wishboard_id);
	//축제정보 업데이트
	void updateFestival(Festival updateFestival);
	//회원의 좋아요 저장
	void saveLikes(FestivalLikes festivalLikes);
	//회원의 찜 저장
	void saveMyList(FestivalMyList festivalMyList);

	//미사용 메소드
	List<Map<String,Object>> findLikesById(Long festival_id);
	List<String> findLikesMemberId(Long festival_id);
	List<Map<String,Object>> findMyListById(Long festival_id);
	List<String> findMyListMemberId(Long festival_id);
	List<Map<String, Object>> findMyListByMemberId(String member_id);
}
