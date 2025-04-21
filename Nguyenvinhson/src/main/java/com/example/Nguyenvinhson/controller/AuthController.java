package com.example.Nguyenvinhson.controller;

import com.example.Nguyenvinhson.dto.LoginRequest;
import com.example.Nguyenvinhson.dto.AuthResponse;
import com.example.Nguyenvinhson.entity.User;
import com.example.Nguyenvinhson.security.JwtUtil;
import com.example.Nguyenvinhson.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Optional<User> optionalUser = userService.login(request.getEmail(), request.getPassword());

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                String token = jwtUtil.generateToken(user.getId());


                return ResponseEntity.ok(new AuthResponse(token, user.getEmail()));
            } else {
                return ResponseEntity.status(401).body(createError("Sai email hoặc mật khẩu!"));
            }

        } catch (Exception e) {
            e.printStackTrace(); // ✅ In ra lỗi thật sự trong terminal
            return ResponseEntity.status(500).body(createError("Lỗi hệ thống: " + e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest request) {
        Object userIdAttr = request.getAttribute("userId");
    
        if (userIdAttr == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Token không hợp lệ hoặc thiếu!"));
        }
    
        Integer userId = Integer.parseInt(userIdAttr.toString());
    
        Optional<User> user = userService.findById(userId);
        if (user.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "Không tìm thấy người dùng!"));
        }
    
        return ResponseEntity.ok(user.get());
    }
    

    private Map<String, String> createError(String message) {
        Map<String, String> error = new HashMap<>();
        error.put("error", message);
        return error;
    }
}
