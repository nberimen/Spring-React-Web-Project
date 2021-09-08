package com.nberimen.hoax;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nberimen.hoax.vm.HoaxVM;
import com.nberimen.shared.CurrentUser;
import com.nberimen.shared.GenericResponse;
import com.nberimen.user.User;

@RestController
@RequestMapping("/api/1.0")
public class HoaxController {

	@Autowired
	HoaxService hoaxService;
	
	@PostMapping("/hoaxes")
	GenericResponse saveHoax(@Valid @RequestBody Hoax hoax,  @CurrentUser User user) {
		hoaxService.save(hoax, user);
		return new GenericResponse("Hoax is saved");
	}
	
	@GetMapping("/hoaxes")
	Page<HoaxVM> getHoaxes(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable page){
		return hoaxService.getHoaxes(page).map(HoaxVM::new);
	}

	@GetMapping("/hoaxes/{id:[0-9]+}")
	Page<HoaxVM> getHoaxesRelative(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable page, @PathVariable long id){
		return hoaxService.getOldHoaxes(id, page).map(HoaxVM::new);
	}

	
	@GetMapping("/users/{username}/hoaxes")
	Page<HoaxVM> getUserHoaxes(@PathVariable String username, @PageableDefault(sort = "id", direction = Direction.DESC) Pageable page){
		return hoaxService.getHoaxesOfUser(username,page).map(HoaxVM::new);
	}
	
	@GetMapping("/users/{username}/hoaxes/{id:[0-9]+}")
	Page<HoaxVM> getUserHoaxesRelative(@PathVariable long id, @PathVariable String username, @PageableDefault(sort = "id", direction = Direction.DESC) Pageable page){
		return hoaxService.getOldHoaxesOfUser(id ,username,page).map(HoaxVM::new);
	}
}