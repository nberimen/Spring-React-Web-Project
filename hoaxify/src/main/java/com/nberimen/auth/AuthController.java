package com.nberimen.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nberimen.shared.CurrentUser;
import com.nberimen.user.User;
import com.nberimen.user.UserRepository;
import com.nberimen.user.vm.UserVM;

@RestController
public class AuthController {

	@Autowired
	UserRepository userRepository;

	
	@PostMapping("/api/1.0/auth")
	UserVM handleAuthentication(@CurrentUser User user) {
		
		return new UserVM(user);
	}
	
}
