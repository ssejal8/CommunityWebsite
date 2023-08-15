package com.nagarro.communitybackend.controller;

import com.nagarro.communitybackend.constants.Constants;
import com.nagarro.communitybackend.dto.AuthenticationRequest;
import com.nagarro.communitybackend.entities.User;
import com.nagarro.communitybackend.repository.UserRepository;
import com.nagarro.communitybackend.services.UserService;
import com.nagarro.communitybackend.utils.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class AuthenticationController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public static final String TOKEN_PREFIX = Constants.BEARER;
    public static final String HEADER_STRING = Constants.AUTHORIZATION;

    @PostMapping("/authenticate")
    public  void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws BadCredentialsException, DisabledException, UsernameNotFoundException, IOException, JSONException, ServletException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));    //authenticates user , and the authorities allowed 
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(Constants.BAD_CREDENTIALS);
        } catch (DisabledException disabledException) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, Constants.USER_NOT_ACTIVATED);
            return;
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());   //checks if the user's account is valid(not expired) (returns true/false)
        User user = userRepository.findFirstByEmail(userDetails.getUsername()); //finds the user with respective username
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());  //generates token set headers, payload, signature(secret key) 
        
        response.getWriter().write(new JSONObject()
        		.put(Constants.NAME, user.getName())
                .put(Constants.USER_ID, user.getId())
                .put(Constants.ROLE, user.getUserRole())
                .toString()
        );
        response.addHeader(Constants.EXPOSE_HEADERS, Constants.AUTHORIZATION);
        response.addHeader(Constants.ALLOW_HEADERS, Constants.HEADERS);
        response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwt);
    }
    
    @PostMapping("/authenticate/admin")
    public  void createAuthenticationTokenAdmin(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws BadCredentialsException, DisabledException, UsernameNotFoundException, IOException, JSONException, ServletException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(Constants.BAD_CREDENTIALS);
        } catch (DisabledException disabledException) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, Constants.USER_NOT_ACTIVATED);
            return;
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        User user = userRepository.findFirstByEmail(userDetails.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername()); //set claims, set sub, set issuedAt, set expiredAt,(secret key)

        response.getWriter().write(new JSONObject()
        		.put(Constants.NAME, user.getName())
                .put(Constants.USER_ID, user.getId())
                .put(Constants.ROLE, user.getUserRole())
                .toString()
        );
        response.addHeader(Constants.EXPOSE_HEADERS, Constants.AUTHORIZATION);
        response.addHeader(Constants.ALLOW_HEADERS, Constants.HEADERS);
        response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwt);
    }

}
