package com.nagarro.communitybackend.services;

import java.util.ArrayList;

import com.nagarro.communitybackend.dto.ReviewDTO;
import com.nagarro.communitybackend.entities.Review;

public interface ReviewService {
	Review addReview(ReviewDTO review);  //saves review in the db

	int getReviewsCount();               // returns count of the reviews table

	int countByProductId(Long product_id);   //returns count of reviews based upon product's id

	Double getAverageRating(Long product_id);  //selects reviews based upon product id and calculates the avg of rating parameter.

	ArrayList<Review> getApprovedReviewByProductId(Long product_id);  //returns the list of reviews which are approved by admin

	ArrayList<Review> getPendingReviews();    // returns list of reviews that are not approved(pending)

	void approveReview(Long review_id);        // approves review by selecting the review based upon review id and changes isApproved Parameter to true 

	void deleteReviewById(Long review_id);   //deletes review id from db based uopn the review id passed.
}
