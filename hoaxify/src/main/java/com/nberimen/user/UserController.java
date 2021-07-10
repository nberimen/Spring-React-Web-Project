package com.nberimen.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nberimen.shared.GenericResponse;

@RestController
public class UserController {


	@Autowired
	private UserService userService;
	
	
	@PostMapping("/api/1.0/users")
	public GenericResponse createUser(@RequestBody User user) {
		userService.save(user);
		 return new GenericResponse("user created");
		
	}
}

