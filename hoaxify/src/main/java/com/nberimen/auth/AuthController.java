package com.nberimen.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.nberimen.shared.CurrentUser;
import com.nberimen.shared.Views;
import com.nberimen.user.User;
import com.nberimen.user.UserRepository;

@RestController
public class AuthController {

	@Autowired
	UserRepository userRepository;

	
	@PostMapping("/api/1.0/auth")
	@JsonView(Views.Base.class)
	ResponseEntity<?> handleAuthentication(@CurrentUser User user) {
		
		return ResponseEntity.ok(user);
	}
	
}
