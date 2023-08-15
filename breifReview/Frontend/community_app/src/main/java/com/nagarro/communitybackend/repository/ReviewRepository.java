package com.nagarro.communitybackend.repository;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.nagarro.communitybackend.entities.Review;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
	ArrayList<Review> findByProductId(Long product_id);

	int countByProductId(Long product_id);

	@Query("SELECT r FROM Review r WHERE r.productId = :productId AND r.isApproved = true")
	ArrayList<Review> findAllApprovedReviewsByProductId(Long productId);

	@Query("SELECT r FROM Review r WHERE r.isApproved = false")
	ArrayList<Review> findAllPendingReviews();
	
	@Query("SELECT AVG(u.rating) FROM Review u WHERE u.productId = :productId AND u.isApproved = :isApproved")
	Double findAverageByProductId(@Param("productId") Long product_id, boolean isApproved);

	@Modifying
	@Transactional
	@Query("UPDATE Review r SET r.isApproved = :isApproved WHERE r.reviewId = :reviewId")
	void approveReview(@Param("reviewId") Long reviewId, boolean isApproved);

	@Modifying
	@Transactional
	@Query("DELETE FROM Review r WHERE r.reviewId = :reviewId")
	void deleteReviewById(Long reviewId);
}