package com.nberimen.file.vm;

import com.nberimen.file.FileAttachment;

import lombok.Data;

@Data
public class FileAttachmentVM {

	private String name;
	
	public FileAttachmentVM(FileAttachment fileAttachment) {
		this.setName(fileAttachment.getName());
	}
}
