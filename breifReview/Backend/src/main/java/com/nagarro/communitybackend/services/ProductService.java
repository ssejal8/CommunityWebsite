package com.nagarro.communitybackend.services;

import java.util.List;

import com.nagarro.communitybackend.dto.ProductDTO;
import com.nagarro.communitybackend.entities.Product;

public interface ProductService {
	
	Product saveProduct(ProductDTO product);  //saves the product in db

	List<Product> getAllProducts();   //fetches all products from db

	int getProductsCount();          //gets count of Products table

	Product getProductById(Long product_id);   //fetches product based upon its id

	Product getProduct(String product_code);   //fetches product based upon its code

	List<Product> getAllProductsByBrand(String brand);   //fetches list of products that matches the brand name

	List<Product> getAllProductsByCode(String code);     //fetches list of products that matches the code

	List<Product> getAllProductsByName(String name);     //fetches list of products that matches the product name
	
	List<Product> searchProducts(List<String> name);     //fetches list of products based upon the keywords entered.
	
}
