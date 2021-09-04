package com.nberimen.shared;

import java.util.Arrays;
import java.util.stream.Collectors;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.hibernate.validator.constraintvalidation.HibernateConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import com.nberimen.file.FileService;

public class FileTypeValidator implements ConstraintValidator<FileType, String>{

	@Autowired
	FileService fileService;
	String[] types;
	
	@Override
	public void initialize(FileType constraintAnnotation) {
		this.types = constraintAnnotation.types();
		
	}
	
	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		if(value == null || value.isEmpty()) {
			return true;
		}
		String fileType = fileService.dedectType(value);
		for(String supportedType: this.types) {
			if(fileType.contains(supportedType)) {
				return true;
			}
		}
		String suppordetTypes = Arrays.stream(this.types).collect(Collectors.joining(", "));
		context.disableDefaultConstraintViolation();
		HibernateConstraintValidatorContext hibernateConstraintValidatorContext = context.unwrap(HibernateConstraintValidatorContext.class);
		hibernateConstraintValidatorContext.addMessageParameter("types", suppordetTypes);
		hibernateConstraintValidatorContext.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate()).addConstraintViolation();
		return false;
	}

}
