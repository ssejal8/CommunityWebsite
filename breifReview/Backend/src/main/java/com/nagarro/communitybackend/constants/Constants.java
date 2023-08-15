package com.nagarro.communitybackend.constants;

public class Constants {
	public static final String SECRET= "5367566B59703373367639792F423F4528482B4D6251655468576D5A713474375367566B59703373367639792F423F4528482B4D6251655468576D5A713474375367566B59703373367639792F423F4528482B4D6251655468576D5A713474375367566B59703373367639792F423F4528482B4D6251655468576D5A713474375367566B59703373367639792F423F4528482B4D6251655468576D5A713474375367566B59703373367639792F423F4528482B4D6251655468576D5A713474375367566B59703373367639792F423F4528482B4D6251655468576D5A713474375367566B59703373367639792F423F4528482B4D6251655468576D5A713474375367566B59703373367639792F423F4528482B4D6251655468576D5A713474375367566B59703373367639792F423F4528482B4D6251655468576D5A713474375367566B59703373367639792F423F4528482B4D6251655468576D5A713474375367566B59703373367639792F423F4528482B4D6251655468576D5A713474375367566B59703373367639792F423F4528482B4D6251655468576D5A713474375367566B59703373367639792F423F4528482B4D6251655468576D5A713474375367566B59703373367639792F423F4528482B4D6251655468576D5A713474375367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";
	public static final String ALLOW_ORIGIN ="Access-Control-Allow-Origin";
	public static final String ALLOW_METHODS ="Access-Control-Allow-Methods";
	public static final String METHODS ="POST, GET, PUT, OPTIONS, DELETE";
	public static final String ALLOW_MAX_AGE = "Access-Control-Max-Age";
	public static final String ALLOW_HEADERS ="Access-Control-Allow-Headers";
	public static final String ORIGIN ="origin";
	public static final String MAX_AGE = "3600";
	public static final String ALL = "*";
	public static final String OPTIONS ="OPTIONS";
	public static final String EXPOSE_HEADERS ="Access-Control-Expose-Headers";
	public static final String AUTHORIZATION = "Authorization";
	public static final String HEADERS ="Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header";
	public static final String BAD_CREDENTIALS = "Incorrect username or password.";
	public static final String USER_NOT_ACTIVATED = "User is not activated";
	public static final String BEARER = "Bearer ";
	public static final String NAME= "name";
	public static final String USER_ID ="userId";
	public static final String ROLE ="role";
	public static final String PRODUCT_NOT_CREATED = "Product not created. Come again later!";
	public static final String BRAND ="brand";
	public static final String CODE ="code";
	public static final String PRODUCT_CODE ="product_code";
	public static final String PRODUCT_ID ="product_id";
	public static final String REVIEW_NOT_CREATED = "Review not created. Come again later!";
	public static final String REVIEW_ID ="review_id";
	public static final String USER_EXISTS ="User already exists";
	public static final String USER_NOT_CREATED = "User not created. Come again later!";
	public static final String RESOURCE_NOT_FOUND = "%s not found with %s:'%s'";
	public static final String QUERY_GET_APPROVED_REVIEWS = "SELECT r FROM Review r WHERE r.productId = :productId AND r.isApproved = true";
	public static final String QUERY_AVERAGE_RATING = "SELECT AVG(u.rating) FROM Review u WHERE u.productId = :productId AND u.isApproved = :isApproved";
	public static final String QUERY_APPROVE_REVIEW="UPDATE Review r SET r.isApproved = :isApproved WHERE r.reviewId = :reviewId";
	public static final String QUERY_REJECT_REVIEW = "DELETE FROM Review r WHERE r.reviewId = :reviewId";
	public static final String QUERY_GET_PENDING_REVIEWS = "SELECT r FROM Review r WHERE r.isApproved = false";
	public static final String KEY = "keys";
	public static final String FILTER = "filter";
}