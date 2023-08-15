package com.nagarro.communitybackend.repository;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nagarro.communitybackend.constants.Constants;
import com.nagarro.communitybackend.entities.Review;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
	ArrayList<Review> findByProductId(Long product_id);

	long countByProductIdAndIsApproved(Long product_id, boolean isApproved);

	@Query(Constants.QUERY_GET_APPROVED_REVIEWS)
	ArrayList<Review> findAllApprovedReviewsByProductId(Long productId);

	@Query(Constants.QUERY_GET_PENDING_REVIEWS)
	ArrayList<Review> findAllPendingReviews();
	
	@Query(Constants.QUERY_AVERAGE_RATING)
	Double findAverageByProductId(@Param("productId") Long product_id, boolean isApproved);

	@Modifying
	@Transactional
	@Query(Constants.QUERY_APPROVE_REVIEW)
	void approveReview(@Param("reviewId") Long reviewId, boolean isApproved);

	@Modifying
	@Transactional
	@Query(Constants.QUERY_REJECT_REVIEW)
	void deleteReviewById(Long reviewId);
}