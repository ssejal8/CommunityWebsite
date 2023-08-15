package com.nagarro.communitybackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.communitybackend.constants.Constants;
import com.nagarro.communitybackend.dto.ProductDTO;
import com.nagarro.communitybackend.entities.Product;
import com.nagarro.communitybackend.services.ProductService;

import jakarta.servlet.http.HttpServletResponse;

@RestController

public class ProductController {
	
	@Autowired
    private ProductService productService;
	
	@PostMapping("api/addproduct")
	public ResponseEntity<?> addProduct(@RequestBody ProductDTO product, HttpServletResponse response){
		Product createdProduct = productService.saveProduct(product);
        if (createdProduct == null) {
            return new ResponseEntity<>(Constants.PRODUCT_NOT_CREATED, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
	}
	
	@GetMapping("api/getallproducts")
	public List<Product> getAllproducts(){
		return productService.getAllProducts();
	}
	@GetMapping("api/getallproductsbybrand/{brand}")
	public List<Product> getAllproductsByBrand(@PathVariable(Constants.BRAND) String brand){
		return productService.getAllProductsByBrand(brand);
	}
	@GetMapping("api/getallproductsbycode/{code}")
	public List<Product> getAllproductsByCode(@PathVariable(Constants.CODE) String code){
		return productService.getAllProductsByCode(code);
	}
	@GetMapping("api/getallproductsbyname/{name}")
	public List<Product> getAllproductsByName(@PathVariable(Constants.NAME) String name){
		return productService.getAllProductsByName(name);
	}
	@GetMapping("api/getproduct/{product_code}")
	public Product getAllproducts(@PathVariable(Constants.PRODUCT_CODE) String product_code){
		return productService.getProduct(product_code);
	}
	@GetMapping("api/getproductbyid/{product_id}")
	public Product getProductsById(@PathVariable(Constants.PRODUCT_ID) Long product_id){
		return productService.getProductById(product_id);
	}
	@GetMapping("/getproductcount")
	public int getProductsCount() {
		return productService.getProductsCount();
	}
	@GetMapping("api/search/{keys}")
	public List<Product> searchProducts(@PathVariable(Constants.KEY) List<String> keys){
		return productService.searchProducts(keys);
	}

	

}
