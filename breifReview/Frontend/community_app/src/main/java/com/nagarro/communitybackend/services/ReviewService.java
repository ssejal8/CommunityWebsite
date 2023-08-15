package com.nagarro.communitybackend.services;

import java.util.ArrayList;

import com.nagarro.communitybackend.dto.ReviewDTO;
import com.nagarro.communitybackend.entities.Review;

public interface ReviewService {
	Review addReview(ReviewDTO reviewDTO);
	int getReviewsCount();
	int countByProductId(Long product_id);
	Double getAverageRating(Long product_id);
	ArrayList<Review> getApprovedReviewByProductId(Long product_id);
	ArrayList<Review> getPendingReviews();
	void approveReview(Long review_id);
	void deleteReviewById(Long review_id);
}
