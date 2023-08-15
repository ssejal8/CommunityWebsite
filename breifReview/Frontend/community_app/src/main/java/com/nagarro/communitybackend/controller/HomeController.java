package com.nagarro.communitybackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.communitybackend.services.UserService;

@RestController
public class HomeController {
	
	@Autowired
	private UserService userService;

	@GetMapping("/getusercount")
	public int getUsersCount() {
        return userService.getUserCount();
	}
}
