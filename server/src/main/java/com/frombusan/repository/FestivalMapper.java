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
	//좋아요유무
	Boolean checkMemberLikeStatus(@Param("festival_Id")Long festival_Id, @Param("member_Id")String memberId);
	//찜유무
	Boolean checkMemberWishListStatus(@Param("festival_Id")Long festival_Id, @Param("member_Id")String memberId);

	//좋아요 기능
	void updateFestival(Festival updateFestival);

	List<String> findLikesMemberId(Long festival_id);

	List<Map<String,Object>> findLikesById(Long festival_id);

	void saveLikes(FestivalLikes festivalLikes);

	void deleteLike(Object like_id);
//
	//찜하기

	void saveMyList(FestivalMyList festivalMyList);

	List<Map<String,Object>> findMyListById(Long festival_id);

	List<String> findMyListMemberId(Long festival_id);

	//테이블 다른걸로!
	void deleteMyList(Object wishboard_id);

	List<Festival> findMyWishlistByMemberId(String member_id);

}
