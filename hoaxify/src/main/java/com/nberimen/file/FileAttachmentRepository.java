package com.nberimen.file;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nberimen.user.User;

@Repository
public interface FileAttachmentRepository extends JpaRepository<FileAttachment, Long> {

	List<FileAttachment> findByDateBeforeAndHoaxIsNull(Date date);
	
	List<FileAttachment> findByHoaxUser(User user);
}
