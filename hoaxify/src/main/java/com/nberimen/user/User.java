package com.nberimen.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

@Entity
@Data
public class User {

	@Id
	@GeneratedValue
	private long id;
	
	@NotNull
	@Size(min = 4, max=255)
	@UniqueUsername
	private String username;
	
	@NotNull
	@Size(min = 4, max=255)
	private String displayName;
	
	@NotNull
	@Size(min = 8, max=255)
	@Pattern(regexp ="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")
	private String password;
}
