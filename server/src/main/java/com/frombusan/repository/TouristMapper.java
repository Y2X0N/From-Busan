package com.frombusan.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import com.frombusan.model.tourist.TouristSpotLikes;
import com.frombusan.model.tourist.TouristSpotMyList;
import com.frombusan.model.tourist.Tourist_Spot;

@Mapper
public interface TouristMapper {

	List<Tourist_Spot> findAllTouristForMain();

	List<Tourist_Spot> findAllTourist(String searchText,RowBounds rowBounds);
	
	List<Tourist_Spot> findAllTourist();
	
	Tourist_Spot findTouristSpot(Long tourist_Spot_id);

	int getTotal(String searchText);

	Boolean checkMemberLikeStatus(@Param("tourist_Spot_id") Long touristSpotId,@Param("member_id") String memberId);

	Boolean checkMemberWishListStatus(@Param("tourist_Spot_id") Long touristSpotId,@Param("member_id") String memberId);

	//좋아요 기능	
	void updateTourist(Tourist_Spot updateTouristSpot);

	List<Map<String,Object>> findLikesById(Long tourist_Spot_id);

	TouristSpotLikes findTouristSpotLike(@Param("tourist_Spot_id") Long touristSpotId, @Param("member_id") String memberId);

	TouristSpotMyList findTouristSpotWishList(@Param("tourist_Spot_id") Long touristSpotId, @Param("member_id") String memberId);

	void saveLikes(TouristSpotLikes touristSpotLikes);

	void deleteLike(Object like_id);

	//찜 기능
	void saveMyList(TouristSpotMyList touristSpotMyList);

	void deleteMyList(Object wishboard_id);

	//찜 목록
	List<Tourist_Spot> findMyWishlistByMemberId(String member_id);

	void addHit(Tourist_Spot tourist_Spot);

}
