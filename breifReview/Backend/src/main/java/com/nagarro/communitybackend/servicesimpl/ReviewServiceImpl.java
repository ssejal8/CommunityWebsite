package com.nagarro.communitybackend.servicesimpl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.communitybackend.dto.ReviewDTO;
import com.nagarro.communitybackend.entities.Review;
import com.nagarro.communitybackend.repository.ReviewRepository;
import com.nagarro.communitybackend.services.ReviewService;

@Service
public class ReviewServiceImpl implements ReviewService{
	
	@Autowired
	private ReviewRepository reviewRepo;
	
	public Review addReview(ReviewDTO reviewDTO) {
		Review review = new Review();
		review.setReviewId(reviewDTO.getReview_id());
		review.setProductId(reviewDTO.getProduct_id());
		review.setReview(reviewDTO.getReview());
		review.setApproved(reviewDTO.isApproved());
		review.setUser(reviewDTO.getUser());
		review.setRating(reviewDTO.getRating());
		Review createdReview =  reviewRepo.save(review);
		return createdReview;
	}
	@Override
	public int getReviewsCount() {
		return (int) reviewRepo.count();
	}
	@Override
	public ArrayList<Review> getApprovedReviewByProductId(Long product_id){
		return reviewRepo.findAllApprovedReviewsByProductId(product_id);
	}
	public ArrayList<Review> getPendingReviews(){
		return reviewRepo.findAllPendingReviews();
	}
	@Override
	public int countByProductId(Long product_id) {
		return (int) reviewRepo.countByProductIdAndIsApproved(product_id,true);
	}
	@Override
	public Double getAverageRating(Long product_id) {
		return reviewRepo.findAverageByProductId(product_id,true);
	}
	@Override
	public void approveReview(Long review_id) {
		 reviewRepo.approveReview(review_id, true);
		
	}
	@Override
	public void deleteReviewById(Long review_id) {
		reviewRepo.deleteReviewById(review_id);
		
	}
}
