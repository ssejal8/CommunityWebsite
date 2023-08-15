package com.nagarro.communitybackend.services;

import com.nagarro.communitybackend.dto.SignupDTO;
import com.nagarro.communitybackend.dto.UserDTO;

public interface UserService {
	UserDTO createUser(SignupDTO signupDTO);  //saves new user in the db

	UserDTO createAdmin(SignupDTO signupDTO);  

	int getUserCount();                       //returns count of users table

	boolean hasUserWithEmail(String email);     //checks if a user exits in the db based upon email
}
