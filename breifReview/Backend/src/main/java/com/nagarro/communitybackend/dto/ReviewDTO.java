package com.nagarro.communitybackend.dto;

public class ReviewDTO {
	
	private Long review_id;
	private Long product_id;
	private String review;
	private boolean isApproved;
	private int rating;
	private String user;
	
	
	public Long getReview_id() {
		return review_id;
	}
	public void setReview_id(Long review_id) {
		this.review_id = review_id;
	}
	public Long getProduct_id() {
		return product_id;
	}
	public void setProduct_id(Long product_id) {
		this.product_id = product_id;
	}
	public String getReview() {
		return review;
	}
	public void setReview(String review) {
		this.review = review;
	}
	public boolean isApproved() {
		return isApproved;
	}
	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	
}
