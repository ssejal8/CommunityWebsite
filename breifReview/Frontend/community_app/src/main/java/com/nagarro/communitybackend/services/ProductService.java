package com.nagarro.communitybackend.services;

import java.util.ArrayList;
import java.util.List;

import com.nagarro.communitybackend.dto.ProductDTO;
import com.nagarro.communitybackend.entities.Product;

public interface ProductService {
	Product createProduct(ProductDTO productDTO);
	List<Product> getAllProducts();
	int getProductsCount();
	Product getProduct(Long product_id);
	List<Product> getAllProductsByBrand(String brand);
	List<Product> getAllProductsByCode(String code);
	List<Product> getAllProductsByName(String name);
	List<Product> getAllOrderByName();
	List<Product> getAllOrderByCode();
	List<Product> getAllOrderByBrand();
}
