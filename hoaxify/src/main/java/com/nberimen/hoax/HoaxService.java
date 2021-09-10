package com.nberimen.hoax;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.nberimen.file.FileAttachment;
import com.nberimen.file.FileAttachmentRepository;
import com.nberimen.file.FileService;
import com.nberimen.hoax.vm.HoaxSubmitVM;
import com.nberimen.user.User;
import com.nberimen.user.UserService;

@Service
public class HoaxService {

	HoaxRepository hoaxRepository;
	UserService userService;
	FileAttachmentRepository fileAttachmentRepository;
	FileService fileService;

	public HoaxService(HoaxRepository hoaxRepository,
			FileAttachmentRepository fileAttachmentRepository, FileService fileService, UserService userService) {
		this.hoaxRepository = hoaxRepository;
		this.fileAttachmentRepository = fileAttachmentRepository;
		this.fileService = fileService;
		this.userService = userService;
	}

	public void save(HoaxSubmitVM hoaxSubmitVM, User user) {
		Hoax hoax = new Hoax();
		hoax.setContent(hoaxSubmitVM.getContent());
		hoax.setTimestamp(new Date());
		hoax.setUser(user);
		hoaxRepository.save(hoax);
		Optional<FileAttachment> optionalFileAttachment = fileAttachmentRepository
				.findById(hoaxSubmitVM.getAttachmentId());
		if (optionalFileAttachment.isPresent()) {
			FileAttachment fileAttachment = optionalFileAttachment.get();
			fileAttachment.setHoax(hoax);
			fileAttachmentRepository.save(fileAttachment);
		}
	}

	public Page<Hoax> getHoaxes(Pageable page) {
		return hoaxRepository.findAll(page);
	}

	public Page<Hoax> getHoaxesOfUser(String username, Pageable page) {
		User inDB = userService.getByUsername(username);
		return hoaxRepository.findByUser(inDB, page);
	}

	public Page<Hoax> getOldHoaxes(long id, String username, Pageable page) {
		Specification<Hoax> specification = idLessThan(id);
		if (username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return hoaxRepository.findAll(specification, page);
	}

	public long getNewHoaxCount(long id, String username) {
		Specification<Hoax> specification = idGreaterThan(id);
		if (username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return hoaxRepository.count(specification);
	}

	public List<Hoax> getNewHoaxes(long id, String username, Sort sort) {
		Specification<Hoax> specification = idGreaterThan(id);
		if (username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}
		return hoaxRepository.findAll(specification, sort);
	}

	Specification<Hoax> idLessThan(long id) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.lessThan(root.get("id"), id);
		};
	}

	Specification<Hoax> userIs(User user) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.equal(root.get("user"), user);
		};
	}

	Specification<Hoax> idGreaterThan(long id) {
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.greaterThan(root.get("id"), id);
		};
	}

	public void delete(long id) {
		Hoax inDB = hoaxRepository.getOne(id);
		if (inDB.getFileAttachment() != null) {
			String fileName = inDB.getFileAttachment().getName();
			fileService.deleteAttachmentFile(fileName);
		}
		hoaxRepository.deleteById(id);
	}
	
}
