package com.nagarro.communitybackend.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nagarro.communitybackend.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {


	Product findByProductId(Long product_id);

	Product findByProductCode(String product_code);

	ArrayList<Product> findByBrandNameContainingIgnoreCase(String brand);

	ArrayList<Product> findByProductNameContainingIgnoreCase(String name);

	ArrayList<Product> findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCaseOrBrandNameContainingIgnoreCaseOrProductCodeContainingIgnoreCase(
			String name, String name1, String name2, String name3);

	ArrayList<Product> findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCaseOrBrandNameContainingIgnoreCaseOrProductCodeContainingIgnoreCaseAndProductNameContainingIgnoreCase(
			String name, String name1, String name2, String name3, String filter);

	ArrayList<Product> findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCaseOrBrandNameContainingIgnoreCaseOrProductCodeContainingIgnoreCaseAndBrandNameContainingIgnoreCase(
			String name, String name1, String name2, String name3, String filter);

	ArrayList<Product> findByProductCodeContainingIgnoreCase(String code);
}
