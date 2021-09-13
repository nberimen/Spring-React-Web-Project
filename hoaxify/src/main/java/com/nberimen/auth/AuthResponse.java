package com.nberimen.auth;

import com.nberimen.user.vm.UserVM;

import lombok.Data;

@Data
public class AuthResponse {

	private String token;
	
	private UserVM user;
}
