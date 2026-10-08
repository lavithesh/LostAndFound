package com.lostandfound.io.lostfound.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import com.lostandfound.io.lostfound.dto.PasswordDto;
import com.lostandfound.io.lostfound.entity.foundItem;
import com.lostandfound.io.lostfound.entity.lostItem;
import com.lostandfound.io.lostfound.entity.user;
import com.lostandfound.io.lostfound.service.lostFoundService;
import com.lostandfound.io.lostfound.dto.ChangePasswordDto;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class lostFoundController {
	private lostFoundService service;

	
	public lostFoundController(lostFoundService service) {
		this.service=service;
	}
	
	@PostMapping("/otp")
	public String submitOtp(@RequestParam int otp, @RequestParam String email, RedirectAttributes attributes) {
		return service.submitOtp(otp, email, attributes);
	}
	
	@GetMapping("/")
	public Object getLostItem() {
		return service.getLostItem();
	}
	@PostMapping("/lostItem")
	public ResponseEntity<?> addLostItem(
	        @ModelAttribute lostItem lostitem,
	        @RequestParam(value = "imageFile", required = false) MultipartFile image,
	        HttpSession session) {

	    Object result = service.addLostItem(lostitem, image, session);

	    if (result instanceof String) {

	        String message = (String) result;

	        if (message.equals("User is not logged in")) {
	            return ResponseEntity
	                    .status(HttpStatus.UNAUTHORIZED)
	                    .body(message);
	        }

	        if (message.equals("Please select a valid image")) {
	            return ResponseEntity
	                    .badRequest()
	                    .body(message);
	        }

	        if (message.equals("Failed to upload image")) {
	            return ResponseEntity
	                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body(message);
	        }
	    }

	    return ResponseEntity.ok(result);
	}
	
	@DeleteMapping("/lostItem/{id}")
	public ResponseEntity<?> delLostItem(
	        @PathVariable int id,
	        HttpSession session) {

	    String result = service.delLostItem(id, session);

	    if (result.equals("User is not logged in")) {
	        return ResponseEntity
	                .status(HttpStatus.UNAUTHORIZED)
	                .body(result);
	    }

	    if (result.equals("You are not authorized to delete this item")) {
	        return ResponseEntity
	                .status(HttpStatus.FORBIDDEN)
	                .body(result);
	    }

	    if (result.equals("Item not found")) {
	        return ResponseEntity
	                .status(HttpStatus.NOT_FOUND)
	                .body(result);
	    }

	    return ResponseEntity.ok(result);
	}
	
	@PutMapping("/lostItem/{id}")
	public ResponseEntity<?> upLostItem(
	        @RequestBody lostItem lostitem,
	        @PathVariable int id,
	        HttpSession session) {

	    Object result = service.upLostItem(lostitem, id, session);

	    if (result instanceof String) {

	        String message = (String) result;

	        if (message.equals("User is not logged in")) {
	            return ResponseEntity
	                    .status(HttpStatus.UNAUTHORIZED)
	                    .body(message);
	        }

	        if (message.equals("You are not authorized to update this item")) {
	            return ResponseEntity
	                    .status(HttpStatus.FORBIDDEN)
	                    .body(message);
	        }

	        if (message.equals("Item not found")) {
	            return ResponseEntity
	                    .status(HttpStatus.NOT_FOUND)
	                    .body(message);
	        }
	    }

	    return ResponseEntity.ok(result);
	}
	
	@GetMapping("/lostItem/{id}")
	public Object getByIdLostItem(@PathVariable int id) {
		return service.getByIdLostItem(id);
	}
	
	@GetMapping("/my-lost-items")
	public ResponseEntity<?> getMyLostItems(HttpSession session) {

	    user loggedUser = (user) session.getAttribute("user");

	    if (loggedUser == null) {
	        return ResponseEntity
	                .status(HttpStatus.UNAUTHORIZED)
	                .body("User is not logged in");
	    }

	    return ResponseEntity.ok(
	            service.getMyLostItems(session)
	    );
	}
	
	
	/* found item
	 */
	@GetMapping("/foundItem")
	public Object getFoundItem() {
		return service.getFoundItem();
	}
	@PostMapping("/foundItem")
	public ResponseEntity<?> addFoundItem(
	        @ModelAttribute foundItem founditem,
	        @RequestParam(value = "imageFile", required = false) MultipartFile image,
	        HttpSession session) {

	    Object result = service.addFoundItem(founditem, image, session);

	    if (result instanceof String) {

	        String message = (String) result;

	        if (message.equals("User is not logged in")) {
	            return ResponseEntity
	                    .status(HttpStatus.UNAUTHORIZED)
	                    .body(message);
	        }

	        if (message.equals("Please select a valid image")) {
	            return ResponseEntity
	                    .badRequest()
	                    .body(message);
	        }

	        if (message.equals("Failed to upload image")) {
	            return ResponseEntity
	                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body(message);
	        }
	    }

	    return ResponseEntity.ok(result);
	}
	@DeleteMapping("/foundItem/{id}")
	public ResponseEntity<?> delFoundItem(
	        @PathVariable int id,
	        HttpSession session) {

	    String result = service.delFoundItem(id, session);

	    if (result.equals("User is not logged in")) {
	        return ResponseEntity
	                .status(HttpStatus.UNAUTHORIZED)
	                .body(result);
	    }

	    if (result.equals("You are not authorized to delete this item")) {
	        return ResponseEntity
	                .status(HttpStatus.FORBIDDEN)
	                .body(result);
	    }

	    if (result.equals("Item not found")) {
	        return ResponseEntity
	                .status(HttpStatus.NOT_FOUND)
	                .body(result);
	    }

	    return ResponseEntity.ok(result);
	}
	@PutMapping("/foundItem/{id}")
	public ResponseEntity<?> upFoundItem(
	        @RequestBody foundItem founditem,
	        @PathVariable int id,
	        HttpSession session) {

	    Object result = service.upFoundItem(founditem, id, session);

	    if (result instanceof String) {

	        String message = (String) result;

	        if (message.equals("User is not logged in")) {
	            return ResponseEntity
	                    .status(HttpStatus.UNAUTHORIZED)
	                    .body(message);
	        }

	        if (message.equals("You are not authorized to update this item")) {
	            return ResponseEntity
	                    .status(HttpStatus.FORBIDDEN)
	                    .body(message);
	        }

	        if (message.equals("Item not found")) {
	            return ResponseEntity
	                    .status(HttpStatus.NOT_FOUND)
	                    .body(message);
	        }
	    }

	    return ResponseEntity.ok(result);
	}
	
	@GetMapping("/foundItem/{id}")
	public Object getByIdFoundItem(@PathVariable int id) {
		return service.getByIdFoundItem(id);
	}
	
	@GetMapping("/my-found-items")
	public ResponseEntity<?> getMyFoundItems(HttpSession session) {

	    user loggedUser = (user) session.getAttribute("user");

	    if (loggedUser == null) {
	        return ResponseEntity
	                .status(HttpStatus.UNAUTHORIZED)
	                .body("User is not logged in");
	    }

	    return ResponseEntity.ok(
	            service.getMyFoundItems(session)
	    );
	}
	//user
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody user user,HttpSession session) {

	    Object result = service.loginUser(user,session);

	    if (result instanceof String) {
	        return ResponseEntity
	                .status(HttpStatus.UNAUTHORIZED)
	                .body(result);
	    }

	    return ResponseEntity.ok(result);
	}
	
	@GetMapping("/session")
	public ResponseEntity<?> getSessionUser(HttpSession session) {

	    user loggedUser = (user) session.getAttribute("user");

	    if (loggedUser == null) {
	        return ResponseEntity
	                .status(HttpStatus.UNAUTHORIZED)
	                .body("User is not logged in");
	    }

	    return ResponseEntity.ok(loggedUser);
	}
	
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session) {

	    session.invalidate();

	    return ResponseEntity.ok("Logged out successfully");
	}
	
	@PostMapping("/register")
	public String addUser(@RequestBody user user,BindingResult result) {
		return service.addUser(user,result);
	}
	
	@GetMapping("/resend-otp/{email}")
	public String resendOtp(@PathVariable String email, RedirectAttributes attributes) {
		return service.resendOtp(email, attributes);
	}
	
	@PostMapping("/forgot-password")
	public String forgotPassword(@RequestParam String email, RedirectAttributes attributes) {
		return service.forgotPassword(email, attributes);
	}

	@PostMapping("/reset-password")
	public String resetPassword(@Valid PasswordDto passwordDto, BindingResult result, ModelMap model,
			RedirectAttributes attributes) {
		return service.resetPassword(passwordDto, result, attributes, model);
	}
	
	@GetMapping("/profile")
	public ResponseEntity<?> getProfile(HttpSession session) {

	    Object result = service.getProfile(session);

	    if (result instanceof String &&
	            result.equals("User is not logged in")) {

	        return ResponseEntity
	                .status(HttpStatus.UNAUTHORIZED)
	                .body(result);
	    }

	    return ResponseEntity.ok(result);
	}
	@PutMapping("/profile")
	public ResponseEntity<?> updateProfile(
	        @RequestBody user updatedUser,
	        HttpSession session) {

	    Object result = service.updateProfile(updatedUser, session);

	    if (result instanceof String) {

	        String message = (String) result;

	        if (message.equals("User is not logged in")) {
	            return ResponseEntity
	                    .status(HttpStatus.UNAUTHORIZED)
	                    .body(message);
	        }

	        if (message.equals("User not found")) {
	            return ResponseEntity
	                    .status(HttpStatus.NOT_FOUND)
	                    .body(message);
	        }
	    }

	    return ResponseEntity.ok(result);
	}
	
	@PostMapping("/profile/photo")
	public ResponseEntity<?> uploadProfilePhoto(
	        @RequestParam("file") MultipartFile file,
	        HttpSession session) {

	    Object result = service.uploadProfilePhoto(file, session);

	    if (result instanceof String) {

	        String message = (String) result;

	        if (message.equals("User is not logged in")) {
	            return ResponseEntity
	                    .status(HttpStatus.UNAUTHORIZED)
	                    .body(message);
	        }

	        if (message.equals("Please select an image")) {
	            return ResponseEntity
	                    .badRequest()
	                    .body(message);
	        }
	    }

	    return ResponseEntity.ok(result);
	}
	@PutMapping("/change-password")
	public ResponseEntity<?> changePassword(
	        @RequestBody ChangePasswordDto passwordDto,
	        HttpSession session) {

	    Object result = service.changePassword(passwordDto, session);

	    if (result instanceof String) {

	        String message = (String) result;

	        if (message.equals("User is not logged in")) {
	            return ResponseEntity
	                    .status(HttpStatus.UNAUTHORIZED)
	                    .body(message);
	        }

	        if (message.equals("User not found")) {
	            return ResponseEntity
	                    .status(HttpStatus.NOT_FOUND)
	                    .body(message);
	        }

	        if (message.equals("Current password is incorrect")) {
	            return ResponseEntity
	                    .status(HttpStatus.BAD_REQUEST)
	                    .body(message);
	        }

	        if (message.equals("New passwords do not match")) {
	            return ResponseEntity
	                    .status(HttpStatus.BAD_REQUEST)
	                    .body(message);
	        }

	        if (message.equals("New password must be different")) {
	            return ResponseEntity
	                    .status(HttpStatus.BAD_REQUEST)
	                    .body(message);
	        }
	    }

	    return ResponseEntity.ok(result);
	}
//	@GetMapping("/users")
//	public Object getUsers() {
//		return service.getUser();
//	}
//	
//	@GetMapping("/user/{id}")
//	public Object getUserById(@PathVariable int id) {
//		return service.getUserById(id);
//	}
//	
//	@DeleteMapping("/user/{id}")
//	public String delectById(@PathVariable int id) {
//		return service.deleteById(id);
//	}
//	
//	@PutMapping("/user/{id}")
//	public String upUser(@PathVariable int id,@RequestBody user user) {
//		return service.upUser(id,user);
//	}
	 
	
	
		

}
