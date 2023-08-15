package com.nagarro.communitybackend.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.communitybackend.constants.Constants;
import com.nagarro.communitybackend.dto.ReviewDTO;
import com.nagarro.communitybackend.entities.Product;
import com.nagarro.communitybackend.entities.Review;
import com.nagarro.communitybackend.repository.ReviewRepository;
import com.nagarro.communitybackend.services.ReviewService;

import jakarta.servlet.http.HttpServletResponse;


@RestController
public class ReviewController {
	
	@Autowired
	private ReviewService reviewService;
	
	@PostMapping("api/addreview")
	public ResponseEntity<?> addreview(@RequestBody ReviewDTO review,HttpServletResponse response){
		Review createdReview = reviewService.addReview(review);
        if (createdReview == null) {
            return new ResponseEntity<>(Constants.REVIEW_NOT_CREATED, HttpStatus.BAD_REQUEST);
            
        }
        return new ResponseEntity<>(createdReview, HttpStatus.CREATED);
	}
	
	@GetMapping("/getreviewcount")
	public int getReviewsCount() {
		return reviewService.getReviewsCount();
	}
	@GetMapping("api/getreviews/{product_id}")
	public ArrayList<Review> getApprovedReviews(@PathVariable(Constants.PRODUCT_ID) Long product_id){
		return reviewService.getApprovedReviewByProductId(product_id);
	}
	@GetMapping("api/getpendingreviews")
	public ArrayList<Review> getPendingReviews(){
		return reviewService.getPendingReviews();
	}
	@GetMapping("api/getproductreviewscount/{product_id}")
	public int getProductReviewCount(@PathVariable(Constants.PRODUCT_ID) Long product_id){
		return reviewService.countByProductId(product_id);
	}
	@GetMapping("api/getaveragerating/{product_id}")
	public Double getAverageRating(@PathVariable(Constants.PRODUCT_ID) Long product_id){
		return reviewService.getAverageRating(product_id);
	}
	@DeleteMapping("api/deletereview/{review_id}")
	public void deleteReview(@PathVariable(Constants.REVIEW_ID) Long review_id) {
		 reviewService.deleteReviewById(review_id);
	}
	@PutMapping("api/updatereview/{review_id}")
	public void updateReview(@PathVariable(Constants.REVIEW_ID) Long review_id) {
		reviewService.approveReview(review_id);
	}
	
}
