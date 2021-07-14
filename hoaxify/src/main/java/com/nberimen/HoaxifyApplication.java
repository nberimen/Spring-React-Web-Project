package com.nberimen;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.nberimen.user.User;
import com.nberimen.user.UserService;

@SpringBootApplication
public class HoaxifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(HoaxifyApplication.class, args);
	}

	@Bean
	CommandLineRunner createInitialUsers(UserService userService) {
		return (args) -> {
				User user = new User();
				user.setUsername("user1");
				user.setDisplayName("display1");
				user.setPassword("Password1");
				userService.save(user);
		};
	}
}
