package com.example.Nguyenvinhson.controller;

import com.example.Nguyenvinhson.entity.User;
import com.example.Nguyenvinhson.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import io.swagger.v3.oas.annotations.Parameter;

import java.text.Normalizer;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import java.text.Normalizer;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping
    public List<User> getAll() {
        return userRepository.findByDeletedAtIsNull();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty() || user.get().getDeletedAt() != null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user.get());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> create(
            @RequestParam String fullName,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam String password,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String address,
            @Parameter(description = "Ảnh đại diện", content = @io.swagger.v3.oas.annotations.media.Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE)) @RequestPart(required = false) MultipartFile avatar)
            throws IOException {

        String fileName = saveAvatar(avatar, fullName);

        User user = new User();
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPhone(phone);
        user.setPassword(password);
        user.setRole(role != null ? role : "customer");
        user.setAddress(address);
        user.setAvatar(fileName);
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> update(@PathVariable Integer id,
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) String password,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) MultipartFile avatar) throws IOException {

        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty() || optionalUser.get().getDeletedAt() != null) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();

        if (fullName != null)
            user.setFullName(fullName);
        if (email != null)
            user.setEmail(email);
        if (phone != null)
            user.setPhone(phone);
        if (password != null)
            user.setPassword(password);
        if (role != null)
            user.setRole(role);
        if (address != null)
            user.setAddress(address);

        if (avatar != null && !avatar.isEmpty()) {
            String fileName = saveAvatar(avatar, user.getFullName());
            user.setAvatar(fileName);
        }

        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> softDelete(@PathVariable Integer id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty())
            return ResponseEntity.notFound().build();

        User user = optionalUser.get();
        user.setDeletedAt(LocalDateTime.now());
        user.setDeletedBy(1);
        userRepository.save(user);

        return ResponseEntity.ok("Đã xóa mềm");
    }

    @GetMapping("/trash")
    public List<User> trash() {
        return userRepository.findByDeletedAtIsNotNull();
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<?> restore(@PathVariable Integer id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty() || optionalUser.get().getDeletedAt() == null)
            return ResponseEntity.notFound().build();

        User user = optionalUser.get();
        user.setDeletedAt(null);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        return ResponseEntity.ok("Đã khôi phục");
    }

    @DeleteMapping("/destroy/{id}")
    public ResponseEntity<?> destroy(@PathVariable Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty())
            return ResponseEntity.notFound().build();

        userRepository.delete(user.get());
        return ResponseEntity.ok("Đã xóa vĩnh viễn");
    }

    public static String toSlug(String input) {
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String slug = pattern.matcher(normalized).replaceAll("");
        return slug.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
    }

    private String saveAvatar(MultipartFile file, String fullName) throws IOException {
        if (file == null || file.isEmpty()) return null;
    
        // Lưu đúng vào thư mục uploads trong thư mục gốc project
        String uploadDir = new File("wwwroot/uploads/user").getAbsolutePath(); 
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();
    
        String ext = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String slug = toSlug(fullName);
        String fileName = slug + "." + ext;
    
        File savedFile = new File(dir, fileName);
        file.transferTo(savedFile);
    
        return fileName;
    }
    
}
