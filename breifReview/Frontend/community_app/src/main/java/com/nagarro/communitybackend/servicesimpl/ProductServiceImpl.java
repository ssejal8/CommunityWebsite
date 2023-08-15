package com.nagarro.communitybackend.servicesimpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.communitybackend.dto.ProductDTO;
import com.nagarro.communitybackend.entities.Product;
import com.nagarro.communitybackend.repository.ProductRepository;
import com.nagarro.communitybackend.services.ProductService;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductRepository productRepository;
	@Override
	public Product createProduct(ProductDTO productDTO) {
			Product product = new Product();
	        product.setProductName(productDTO.getProductName());
	        product.setProductId(productDTO.getProductId());
	        product.setProductCode(productDTO.getProductCode());
	        product.setProductDescription(productDTO.getProductDescription());
	        product.setBrandName(productDTO.getBrandName());
	        product.setProductImg(productDTO.getProductImg());
	        Product createdProduct = productRepository.save(product);
	        return createdProduct;
	    }

	@Override
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	@Override
	public List<Product> getAllProductsByBrand(String brand) {
		return productRepository.findByBrandNameContainingIgnoreCase(brand);
	}

	@Override
	public List<Product> getAllProductsByCode(String code) {
		return productRepository.findByProductId(code);
	}

	@Override
	public List<Product> getAllProductsByName(String name) {
		return productRepository.findByProductNameContainingIgnoreCaseAndProductDescriptionContainingIgnoreCase(name,name);
	}

	@Override
	public List<Product> getAllOrderByName() {
		return productRepository.findAllByOrderByProductName();
	}

	@Override
	public List<Product> getAllOrderByCode() {
		return productRepository.findAllByOrderByProductId();
	}

	@Override
	public List<Product> getAllOrderByBrand() {
		return productRepository.findAllByOrderByBrandName();
	}

	@Override
	public int getProductsCount() {
		return (int)productRepository.count();
	}

	@Override
	public Product getProduct(Long product_id) {
		return productRepository.findByProductId(product_id);
	}

	}
	

