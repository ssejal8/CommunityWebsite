package com.nagarro.communitybackend.services;

import com.nagarro.communitybackend.dto.SignupDTO;
import com.nagarro.communitybackend.dto.UserDTO;

public interface UserService {
    UserDTO createUser(SignupDTO signupDTO);
    UserDTO createAdmin(SignupDTO signupDTO);
    int getUserCount();
    boolean hasUserWithEmail(String email);
}
