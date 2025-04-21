package com.example.Nguyenvinhson.controller;

import com.example.Nguyenvinhson.entity.Category;
import com.example.Nguyenvinhson.repository.CategoryRepository;
import com.example.Nguyenvinhson.dto.CategoryStoreRequest;
import com.example.Nguyenvinhson.dto.CategoryUpdateRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryRepository categoryRepository;

    private int getUserIdFromToken() {
        String userIdStr = SecurityContextHolder.getContext().getAuthentication().getName();
        return Integer.parseInt(userIdStr);
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Category> list = categoryRepository.findByDeletedAtIsNull();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable int id) {
        Optional<Category> optional = categoryRepository.findById(id);
        if (optional.isEmpty() || optional.get().getDeletedAt() != null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(optional.get());
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CategoryStoreRequest request) {
        int userId = getUserIdFromToken();
        Category category = new Category();
        category.setName(request.getName());
        category.setCreatedAt(LocalDateTime.now());
        category.setCreatedBy(userId);
        categoryRepository.save(category);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @Valid @RequestBody CategoryUpdateRequest request) {
        Optional<Category> optional = categoryRepository.findById(id);
        if (optional.isEmpty() || optional.get().getDeletedAt() != null)
            return ResponseEntity.notFound().build();

        Category category = optional.get();
        category.setName(request.getName());
        category.setUpdatedBy(getUserIdFromToken());
        category.setUpdatedAt(LocalDateTime.now());
        category.setDeletedAt(null);
        categoryRepository.save(category);
        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> softDelete(@PathVariable int id) {
        Optional<Category> optional = categoryRepository.findById(id);
        if (optional.isEmpty() || optional.get().getDeletedAt() != null)
            return ResponseEntity.notFound().build();

        Category category = optional.get();
        category.setDeletedAt(LocalDateTime.now());
        category.setDeletedBy(getUserIdFromToken());
        categoryRepository.save(category);
        return ResponseEntity.ok("Đã xóa mềm");
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<?> restore(@PathVariable int id) {
        Optional<Category> optional = categoryRepository.findById(id);
        if (optional.isEmpty() || optional.get().getDeletedAt() == null)
            return ResponseEntity.notFound().build();

        Category category = optional.get();
        category.setDeletedAt(null);
        category.setUpdatedAt(LocalDateTime.now());
        category.setUpdatedBy(getUserIdFromToken());
        categoryRepository.save(category);
        return ResponseEntity.ok("Đã khôi phục");
    }

    @DeleteMapping("/destroy/{id}")
    public ResponseEntity<?> destroy(@PathVariable int id) {
        if (!categoryRepository.existsById(id)) return ResponseEntity.notFound().build();
        categoryRepository.deleteById(id);
        return ResponseEntity.ok("Đã xóa vĩnh viễn");
    }
}
