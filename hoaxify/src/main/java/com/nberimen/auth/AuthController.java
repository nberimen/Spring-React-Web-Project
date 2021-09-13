package com.nberimen.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nberimen.shared.CurrentUser;
import com.nberimen.user.User;
import com.nberimen.user.UserRepository;
import com.nberimen.user.vm.UserVM;

@RestController
public class AuthController {

	
	@Autowired
	AuthService authService;
	
	@PostMapping("/api/1.0/auth")
	AuthResponse handleAuthentication(@RequestBody Credentials credentials) {
		return authService.authenticate(credentials);
	}
	
}
