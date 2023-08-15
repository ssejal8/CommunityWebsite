package com.nagarro.communitybackend.servicesimpl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
	public Product saveProduct(ProductDTO productDTO) {
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
		return productRepository.findByProductCodeContainingIgnoreCase(code);
	}

	@Override
	public List<Product> getAllProductsByName(String name) {
		return productRepository.findByProductNameContainingIgnoreCase(name);
	}

	@Override
	public int getProductsCount() {
		return (int)productRepository.count();
	}

	@Override
	public Product getProduct(String product_code) {
		return productRepository.findByProductCode(product_code);
	}
	public Product getProductById(Long product_id) {
		return productRepository.findByProductId(product_id);
	}

	@Override
	public List<Product> searchProducts(List<String> keywords) {
		Set<Product> uniqueResults = new HashSet<>();
		
		for (String keyword : keywords) {
		      List<Product> results = productRepository.findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCaseOrBrandNameContainingIgnoreCaseOrProductCodeContainingIgnoreCase(keyword,keyword,keyword,keyword);
		      uniqueResults.addAll(results);
		}
		List<Product> searchResults = new ArrayList<>(uniqueResults);
		return searchResults;
	}
	
	}
	

