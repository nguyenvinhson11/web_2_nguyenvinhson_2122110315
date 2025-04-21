package com.example.Nguyenvinhson.controller;

import com.example.Nguyenvinhson.entity.Brand;
import com.example.Nguyenvinhson.repository.BrandRepository;
import com.example.Nguyenvinhson.dto.BrandStoreRequest;
import com.example.Nguyenvinhson.dto.BrandUpdateRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/brand")
@RequiredArgsConstructor
public class BrandController {

    private final BrandRepository brandRepository;

    // ✅ Lấy user ID từ token (bên trong subject)
    private int getUserIdFromToken() {
        return Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    // ✅ Lấy danh sách brand chưa xóa
    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Brand> brands = brandRepository.findByDeletedAtIsNull();
        return ResponseEntity.ok(brands);
    }

    // ✅ Xem chi tiết brand
    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable int id) {
        Optional<Brand> brand = brandRepository.findById(id);
        return brand.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Tạo brand mới
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody BrandStoreRequest request) {
        int userId = getUserIdFromToken();
        Brand brand = new Brand();
        brand.setName(request.getName());
        brand.setCreatedBy(userId);
        brand.setCreatedAt(LocalDateTime.now());
        brandRepository.save(brand);
        return ResponseEntity.ok(brand);
    }

    // ✅ Cập nhật brand
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @Valid @RequestBody BrandUpdateRequest request) {
        Optional<Brand> optionalBrand = brandRepository.findById(id);
        if (optionalBrand.isEmpty()) return ResponseEntity.notFound().build();

        Brand brand = optionalBrand.get();
        int userId = getUserIdFromToken();

        if (request.getName() != null && !request.getName().isBlank()) {
            brand.setName(request.getName());
        }

        brand.setUpdatedAt(LocalDateTime.now());
        brand.setUpdatedBy(userId);
        brandRepository.save(brand);
        return ResponseEntity.ok(brand);
    }

    // ✅ Xóa mềm brand
    @DeleteMapping("/{id}")
    public ResponseEntity<?> softDelete(@PathVariable int id) {
        Optional<Brand> optionalBrand = brandRepository.findById(id);
        if (optionalBrand.isEmpty()) return ResponseEntity.notFound().build();

        Brand brand = optionalBrand.get();
        brand.setDeletedAt(LocalDateTime.now());
        brand.setDeletedBy(getUserIdFromToken());
        brandRepository.save(brand);

        return ResponseEntity.ok("Đã xóa mềm");
    }

    // ✅ Khôi phục brand
    @PutMapping("/restore/{id}")
    public ResponseEntity<?> restore(@PathVariable int id) {
        Optional<Brand> optionalBrand = brandRepository.findById(id);
        if (optionalBrand.isEmpty()) return ResponseEntity.notFound().build();

        Brand brand = optionalBrand.get();
        if (brand.getDeletedAt() == null) return ResponseEntity.badRequest().body("Brand chưa bị xóa");

        brand.setDeletedAt(null);
        brand.setUpdatedAt(LocalDateTime.now());
        brand.setUpdatedBy(getUserIdFromToken());
        brandRepository.save(brand);

        return ResponseEntity.ok("Đã khôi phục");
    }

    // ✅ Xóa vĩnh viễn brand
    @DeleteMapping("/destroy/{id}")
    public ResponseEntity<?> destroy(@PathVariable int id) {
        if (!brandRepository.existsById(id)) return ResponseEntity.notFound().build();
        brandRepository.deleteById(id);
        return ResponseEntity.ok("Đã xóa vĩnh viễn");
    }
}
