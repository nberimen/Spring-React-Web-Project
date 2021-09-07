package com.nberimen;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import com.nberimen.hoax.Hoax;
import com.nberimen.hoax.HoaxService;
import com.nberimen.user.User;
import com.nberimen.user.UserService;

@SpringBootApplication
public class HoaxifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(HoaxifyApplication.class, args);
	}

	@Bean
	@Profile("dev")
	CommandLineRunner createInitialUsers(UserService userService, HoaxService hoaxService) {
		return (args) -> {
			for (int i = 1; i <= 25; i++) {
				User user = new User();
				user.setUsername("user" + i);
				user.setDisplayName("display" + i);
				user.setPassword("P4ssword");
				userService.save(user);
				for (int j = 1; j <= 2; j++) {
					Hoax hoax = new Hoax();
					hoax.setContent("hoax (" + j + ") from user (" + i +")");
					hoaxService.save(hoax, user);
				}
			}
		};
	}
}
