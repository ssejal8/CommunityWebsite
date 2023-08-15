package com.nagarro.communitybackend.repository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nagarro.communitybackend.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
	//@Query("select * from product order by average_ratings") 
	ArrayList<Product> findAllByOrderByProductId();
	ArrayList<Product> findAllByOrderByProductName();
	ArrayList<Product> findAllByOrderByBrandName();
	Product findByProductId(Long product_id);
	ArrayList<Product> findByBrandNameContainingIgnoreCase(String brand);
	ArrayList<Product> findByProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(String name,String name1);
	ArrayList<Product> findByProductId(String code);
}
