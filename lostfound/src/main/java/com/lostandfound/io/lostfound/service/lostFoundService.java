package com.lostandfound.io.lostfound.service;


import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.multipart.MultipartFile;

import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


import com.lostandfound.io.lostfound.config.Myconfig;
import com.lostandfound.io.lostfound.dto.PasswordDto;
import com.lostandfound.io.lostfound.entity.foundItem;
import com.lostandfound.io.lostfound.entity.lostItem;
import com.lostandfound.io.lostfound.entity.user;
import com.lostandfound.io.lostfound.repository.foundRepo;
import com.lostandfound.io.lostfound.repository.lostFoundRepo;
import com.lostandfound.io.lostfound.repository.lostRepo;
import com.lostandfound.io.lostfound.util.AES;
import com.lostandfound.io.lostfound.util.EmailHelper;
import com.lostandfound.io.lostfound.dto.ChangePasswordDto;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
@Service
public class lostFoundService {
	private final lostRepo lostrepo;
	private final foundRepo foundrepo;
	private final lostFoundRepo lostfoundrepo;
	private final EmailHelper emailhelper;
	private final RedisService redisService;
	private final SecureRandom secureRandom;

	

	public Object getLostItem() {
		List<lostItem> lostitem=lostrepo.findAll();
		if(lostitem.isEmpty()){
			return new Object();
		}
		return lostitem;
	}

	public Object addLostItem(
	        lostItem lostitem,
	        MultipartFile image,
	        HttpSession session) {

	    user loggedUser = (user) session.getAttribute("user");

	    if (loggedUser == null) {
	        return "User is not logged in";
	    }

	    try {

	        // Upload image if provided
	        if (image != null && !image.isEmpty()) {

	            // Allow only image files
	            if (image.getContentType() == null ||
	                    !image.getContentType().startsWith("image/")) {

	                return "Please select a valid image";
	            }

	            String uploadDir = Paths.get("uploads/items")
	                    .toAbsolutePath()
	                    .toString();

	            Path uploadPath = Paths.get(uploadDir);

	            if (!Files.exists(uploadPath)) {
	                Files.createDirectories(uploadPath);
	            }

	            String originalFileName = image.getOriginalFilename();

	            String extension = "";

	            if (originalFileName != null &&
	                    originalFileName.contains(".")) {

	                extension = originalFileName.substring(
	                        originalFileName.lastIndexOf(".")
	                );
	            }

	            String fileName = java.util.UUID.randomUUID()
	                    + extension;

	            Path filePath = uploadPath.resolve(fileName);

	            Files.write(filePath, image.getBytes());

	            String imagePath = "/uploads/items/" + fileName;

	            lostitem.setImage(imagePath);
	        }

	        // Set owner from session
	        lostitem.setUserId(loggedUser.getId());

	        return lostrepo.save(lostitem);

	    } catch (IOException e) {

	        e.printStackTrace();

	        return "Failed to upload image";
	    }
	}
	public String delLostItem(int id, HttpSession session) {

	    user loggedUser = (user) session.getAttribute("user");

	    if (loggedUser == null) {
	        return "User is not logged in";
	    }

	    Optional<lostItem> item = lostrepo.findById(id);

	    if (item.isEmpty()) {
	        return "Item not found";
	    }

	    if (item.get().getUserId() != loggedUser.getId()) {
	        return "You are not authorized to delete this item";
	    }

	    lostrepo.deleteById(id);

	    return "Lost item deleted successfully";
	}

	public Object upLostItem(lostItem lostitem,int id,
	        HttpSession session) {

	    user loggedUser = (user) session.getAttribute("user");

	    if (loggedUser == null) {
	        return "User is not logged in";
	    }

	    Optional<lostItem> item = lostrepo.findById(id);

	    if (item.isEmpty()) {
	        return "Item not found";
	    }

	    lostItem existitem = item.get();

	    if (existitem.getUserId() != loggedUser.getId()) {
	        return "You are not authorized to update this item";
	    }

	    existitem.setItemName(lostitem.getItemName());
	    existitem.setDateLost(lostitem.getDateLost());
	    existitem.setDescription(lostitem.getDescription());
	    existitem.setImage(lostitem.getImage());
	    existitem.setLocation(lostitem.getLocation());
	    existitem.setStatus(lostitem.getStatus());

	    return lostrepo.save(existitem);
	}

	public Object getByIdLostItem(int id) {
		return lostrepo.findById(id);
	}
	
	public List<lostItem> getMyLostItems(HttpSession session) {

	    user loggedUser = (user) session.getAttribute("user");

	    if (loggedUser == null) {
	        return List.of();
	    }

	    return lostrepo.findByUserId(loggedUser.getId());
	}
	
	//found item

	public Object getFoundItem() {
		return foundrepo.findAll();
	}

	public Object addFoundItem(
	        foundItem founditem,
	        MultipartFile image,
	        HttpSession session) {

	    user loggedUser = (user) session.getAttribute("user");

	    if (loggedUser == null) {
	        return "User is not logged in";
	    }

	    try {

	        if (image != null && !image.isEmpty()) {

	            if (image.getContentType() == null ||
	                    !image.getContentType().startsWith("image/")) {

	                return "Please select a valid image";
	            }

	            String uploadDir = Paths.get("uploads/items")
	                    .toAbsolutePath()
	                    .toString();

	            System.out.println("Found item upload folder: " + uploadDir);

	            Path uploadPath = Paths.get(uploadDir);

	            if (!Files.exists(uploadPath)) {
	                Files.createDirectories(uploadPath);
	            }

	            String originalFileName = image.getOriginalFilename();

	            String extension = "";

	            if (originalFileName != null &&
	                    originalFileName.contains(".")) {

	                extension = originalFileName.substring(
	                        originalFileName.lastIndexOf(".")
	                );
	            }

	            String fileName = java.util.UUID.randomUUID()
	                    + extension;

	            Path filePath = uploadPath.resolve(fileName);

	            Files.write(filePath, image.getBytes());

	            String imagePath = "/uploads/items/" + fileName;

	            founditem.setImage(imagePath);
	        }

	        founditem.setUserId(loggedUser.getId());

	        return foundrepo.save(founditem);

	    } catch (IOException e) {

	        e.printStackTrace();

	        return "Failed to upload image";
	    }
	}

	public String delFoundItem(int id, HttpSession session) {

	    user loggedUser = (user) session.getAttribute("user");

	    if (loggedUser == null) {
	        return "User is not logged in";
	    }

	    Optional<foundItem> item = foundrepo.findById(id);

	    if (item.isEmpty()) {
	        return "Item not found";
	    }

	    if (item.get().getUserId() != loggedUser.getId()) {
	        return "You are not authorized to delete this item";
	    }

	    foundrepo.deleteById(id);

	    return "Found item deleted successfully";
	}

	public Object upFoundItem(
	        foundItem founditem,
	        int id,
	        HttpSession session) {

	    user loggedUser = (user) session.getAttribute("user");

	    if (loggedUser == null) {
	        return "User is not logged in";
	    }

	    Optional<foundItem> item = foundrepo.findById(id);

	    if (item.isEmpty()) {
	        return "Item not found";
	    }

	    foundItem existitem = item.get();

	    if (existitem.getUserId() != loggedUser.getId()) {
	        return "You are not authorized to update this item";
	    }

	    existitem.setItemName(founditem.getItemName());
	    existitem.setDateLost(founditem.getDateLost());
	    existitem.setDescription(founditem.getDescription());
	    existitem.setImage(founditem.getImage());
	    existitem.setLocation(founditem.getLocation());
	    existitem.setStatus(founditem.getStatus());

	    return foundrepo.save(existitem);
	}

	public Object getByIdFoundItem(int id) {
		return foundrepo.findById(id);
		
	}
	
	public List<foundItem> getMyFoundItems(HttpSession session) {

	    user loggedUser = (user) session.getAttribute("user");

	    if (loggedUser == null) {
	        return List.of();
	    }

	    return foundrepo.findByUserId(loggedUser.getId());
	}
	
//user service
	public String addUser(user user,BindingResult result) {
		// Password match validation
				if (!user.getPassword().equals(user.getConfirmpassword())) {
					result.rejectValue("confirmPassword", "error.confirmPassword",
							"* Password and Confirm Password should be same");
				}

				// Uniqueness checks
				if (lostfoundrepo.existsByEmail(user.getEmail())) {
					result.rejectValue("email", "error.email", "* Email should be unique");
				}

				if (lostfoundrepo.existsByMobile(user.getMobile())) {
					result.rejectValue("mobile", "error.mobile", "* Mobile number should be unique");
				}

				// Validation failure
				if (result.hasErrors()) {
					return "register.html";
				}

				// OTP generation & persistence
				int otp = secureRandom.nextInt(100000, 1_000_000);

				emailhelper.sendOtp(otp, user.getName(), user.getEmail());
				redisService.saveUserDto(user.getEmail(), user);
				redisService.saveOtp(user.getEmail(), otp);

	        return "OTP sent successfully";
	}

//	public Object getUser() {
//		return lostfoundrepo.findAll();
//		}
//
//	public Object getUserById(int id) {
//		return lostfoundrepo.findById(id);
//	}
//
//	public String deleteById(int id) {
//		lostfoundrepo.deleteById(id);
//		return "user deleted successfuly";
//	}
//
//	public String upUser(int id, user user) {
//		Optional<user> ouser=lostfoundrepo.findById(id);
//		if(ouser.isPresent()) {
//			user existeduser=ouser.get();
//			existeduser.setName(user.getName());
//			existeduser.setEmail(user.getEmail());
//			existeduser.setPassword(user.getPassword());
//			existeduser.setRole(user.getRole());
//			return "data got updated";
//		}else{
//		return "data not got updated";
//		}
//	}

	public Object loginUser(user user, HttpSession session) {
	    
		Optional<user> optionalUser = lostfoundrepo.findByEmail(user.getEmail());

		// Email validation
		if (optionalUser.isEmpty()) {
			return "email is not exist";
		}

		user userOne = optionalUser.get();

		// Password validation
		String decryptedPassword = AES.decrypt(userOne.getPassword());
		if (!decryptedPassword.equals(user.getPassword())) {
			return "issue in password";
		}


		// Successful login
		session.setAttribute("user", userOne);
		

		return userOne;
	}

	public String submitOtp(int otp, String email, RedirectAttributes attributes) {
		
		user userDto = redisService.getUserDto(email);

		// User DTO expired (timeout)
		if (userDto == null) {
			attributes.addFlashAttribute("fail", "Timeout Try Again Creating a New Account");
			return "redirect:/register";
		}

		int storedOtp = redisService.getOtp(email);

		// OTP expired
		if (storedOtp == 0) {
			attributes.addFlashAttribute("fail", "OTP Expired, Resend Otp and Try Again");
			attributes.addFlashAttribute("email", email);
			return "redirect:/otp";
		}

		// OTP mismatch
		if (otp != storedOtp) {
			attributes.addFlashAttribute("fail", "Invalid OTP Try Again");
			attributes.addFlashAttribute("email", email);
			return "redirect:/otp";
		}

		// OTP success → create user
		user user = new user(null, userDto.getName(), userDto.getEmail(),
				AES.encrypt(userDto.getPassword()),AES.encrypt(userDto.getPassword()),userDto.getMobile(), "USER",userDto.getProfilePhoto(),userDto.getAddress(),userDto.getCity(),userDto.getState(),userDto.getPincode());

		lostfoundrepo.save(user);

		attributes.addFlashAttribute("pass", "Account Registered Success");
		return "redirect:/main";
	}

	public String resendOtp(String email, RedirectAttributes attributes) {
		user userDto = redisService.getUserDto(email);

		// DTO expired
		if (userDto == null) {
			attributes.addFlashAttribute("fail", "Timeout Try Again Creating a New Account");
			return "redirect:/register";
		}

		int otp = secureRandom.nextInt(100000, 1_000_000);

		emailhelper.sendOtp(otp, userDto.getName(), userDto.getEmail());
		redisService.saveOtp(userDto.getEmail(), otp);

		attributes.addFlashAttribute("pass", "Otp Re-Sent Success");
		attributes.addFlashAttribute("email", userDto.getEmail());

		return "OTP SENT SUSSUSFULY";
	}

	public String forgotPassword(String email, RedirectAttributes attributes) {
		Optional<user> optionalUser = lostfoundrepo.findByEmail(email);

		// Email validation
		if (optionalUser.isEmpty()) {
			attributes.addFlashAttribute("fail", "Invalid Email");
			return "redirect:/forgot-password";
		}

	    user user = optionalUser.get();

		int otp = secureRandom.nextInt(100000, 1_000_000);

		emailhelper.sendOtp(otp, user.getName(), email);
		redisService.saveOtp(email, otp);

		attributes.addFlashAttribute("pass", "Sent Success");
		attributes.addFlashAttribute("email", email);

		return "redirect to rest-password page";
	}

	public String resetPassword(@Valid PasswordDto passwordDto, BindingResult result, RedirectAttributes attributes,
			ModelMap model) {
		// Validation errors (form-level)
				if (result.hasErrors()) {
					model.put("email", passwordDto.getEmail());
					return "reset-password";
				}

				Optional<user> optionalUser = lostfoundrepo.findByEmail(passwordDto.getEmail());

				// Invalid email
				if (optionalUser.isEmpty()) {
					attributes.addFlashAttribute("fail", "Invalid Email");
					return "redirect:/forgot-password";
				}

				int storedOtp = redisService.getOtp(passwordDto.getEmail());

				// OTP expired
				if (storedOtp == 0) {
					attributes.addFlashAttribute("fail", "OTP Expired, Resend Otp and Try Again");
					attributes.addFlashAttribute("email", passwordDto.getEmail());
					return "redirect:/reset-password";
				}

				// OTP mismatch
				if (passwordDto.getOtp() != storedOtp) {
					attributes.addFlashAttribute("fail", "Invalid OTP Try Again");
					attributes.addFlashAttribute("email", passwordDto.getEmail());
					return "redirect:/reset-password";
				}

				// OTP success → update password
				user user = optionalUser.get();
				user.setPassword(AES.encrypt(passwordDto.getPassword()));
				lostfoundrepo.save(user);

				attributes.addFlashAttribute("pass", "Password Reset Success");
				return "Go to main page";
	}
	
	public Object getProfile(HttpSession session) {

	    user loggedUser = (user) session.getAttribute("user");

	    if (loggedUser == null) {
	        return "User is not logged in";
	    }

	    return lostfoundrepo.findById(loggedUser.getId());
	}
	
	public Object updateProfile(
	        user updatedUser,
	        HttpSession session) {

	    user loggedUser = (user) session.getAttribute("user");

	    if (loggedUser == null) {
	        return "User is not logged in";
	    }

	    Optional<user> optionalUser =
	            lostfoundrepo.findById(loggedUser.getId());

	    if (optionalUser.isEmpty()) {
	        return "User not found";
	    }

	    user existingUser = optionalUser.get();

	    existingUser.setName(updatedUser.getName());
	    existingUser.setMobile(updatedUser.getMobile());
	    existingUser.setProfilePhoto(updatedUser.getProfilePhoto());
	    existingUser.setAddress(updatedUser.getAddress());
	    existingUser.setCity(updatedUser.getCity());
	    existingUser.setState(updatedUser.getState());
	    existingUser.setPincode(updatedUser.getPincode());

	    user savedUser = lostfoundrepo.save(existingUser);

	    session.setAttribute("user", savedUser);

	    return savedUser;
	}
	public Object uploadProfilePhoto(
	        MultipartFile file,
	        HttpSession session) {

	    user loggedUser = (user) session.getAttribute("user");

	    if (loggedUser == null) {
	        return "User is not logged in";
	    }

	    if (file == null || file.isEmpty()) {
	        return "Please select an image";
	    }

	    try {

	        String uploadDir = Paths.get("uploads/profile")
	                .toAbsolutePath()
	                .toString();

	        System.out.println("Upload folder: " + uploadDir);

	        Path uploadPath = Paths.get(uploadDir);

	        if (!Files.exists(uploadPath)) {
	            Files.createDirectories(uploadPath);
	        }

	        String fileName = System.currentTimeMillis()
	                + "_" + file.getOriginalFilename();

	        Path filePath = uploadPath.resolve(fileName);

	        Files.write(filePath, file.getBytes());

	        String photoPath = "/uploads/profile/" + fileName;

	        loggedUser.setProfilePhoto(photoPath);

	        user savedUser = lostfoundrepo.save(loggedUser);

	        session.setAttribute("user", savedUser);

	        return savedUser;

	    } catch (IOException e) {

	        e.printStackTrace();

	        return "Failed to upload profile photo";
	    }
	}
	public Object changePassword(
	        ChangePasswordDto passwordDto,
	        HttpSession session) {

	    user loggedUser = (user) session.getAttribute("user");

	    if (loggedUser == null) {
	        return "User is not logged in";
	    }

	    Optional<user> optionalUser =
	            lostfoundrepo.findById(loggedUser.getId());

	    if (optionalUser.isEmpty()) {
	        return "User not found";
	    }

	    user existingUser = optionalUser.get();

	    // Check current password
	    String decryptedPassword =
	            AES.decrypt(existingUser.getPassword());

	    if (!decryptedPassword.equals(passwordDto.getCurrentPassword())) {
	        return "Current password is incorrect";
	    }

	    // Check new password and confirm password
	    if (!passwordDto.getNewPassword()
	            .equals(passwordDto.getConfirmPassword())) {

	        return "New passwords do not match";
	    }

	    // Prevent using the same password
	    if (passwordDto.getCurrentPassword()
	            .equals(passwordDto.getNewPassword())) {

	        return "New password must be different";
	    }

	    // Encrypt and save new password
	    existingUser.setPassword(
	            AES.encrypt(passwordDto.getNewPassword())
	    );

	    existingUser.setConfirmpassword(
	            AES.encrypt(passwordDto.getNewPassword())
	    );

	    user savedUser = lostfoundrepo.save(existingUser);

	    // Update session
	    session.setAttribute("user", savedUser);

	    return "Password changed successfully";
	}

	
		

	

}
