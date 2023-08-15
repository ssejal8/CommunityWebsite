package com.nagarro.communitybackend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.communitybackend.dto.ProductDTO;
import com.nagarro.communitybackend.entities.Product;
import com.nagarro.communitybackend.services.ProductService;

import jakarta.servlet.http.HttpServletResponse;

@RestController

public class ProductController {
	
	@Autowired
    private ProductService productService;
	
	@PostMapping("api/add-product")
	public ResponseEntity<?> addProduct(@RequestBody ProductDTO productDTO, HttpServletResponse response){
		Product createdProduct = productService.createProduct(productDTO);
        if (createdProduct == null) {
            return new ResponseEntity<>("Product not created. Come again later!", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
	}
	
	@GetMapping("api/getallproducts")
	public List<Product> getAllproducts(){
		return productService.getAllProducts();
	}
	@GetMapping("api/getallproductsbybrand/{brand}")
	public List<Product> getAllproductsByBrand(@PathVariable("brand") String brand){
		return productService.getAllProductsByBrand(brand);
	}
	@GetMapping("api/getallproductsbycode/{code}")
	public List<Product> getAllproductsByCode(@PathVariable("code") String code){
		return productService.getAllProductsByCode(code);
	}
	@GetMapping("api/getallproductsbyname/{name}")
	public List<Product> getAllproductsByName(@PathVariable("name") String name){
		return productService.getAllProductsByName(name);
	}
	@GetMapping("api/getallproducts/orderbyname")
	public List<Product> getAllproductsOrderByName(){
		return productService.getAllOrderByName();
	}
	@GetMapping("api/getallproducts/orderbybrand")
	public List<Product> getAllproductsOrderByBrand(){
		return productService.getAllOrderByBrand();
	}
	@GetMapping("api/getallproducts/orderbycode")
	public List<Product> getAllproductsOrderByCode(){
		return productService.getAllOrderByCode();
	}
	@GetMapping("api/getproduct/{product_id}")
	public Product getAllproducts(@PathVariable("product_id") Long product_id){
		return productService.getProduct(product_id);
	}
	@GetMapping("/getproductcount")
	public int getProductsCount() {
		return productService.getProductsCount();
	}

}
