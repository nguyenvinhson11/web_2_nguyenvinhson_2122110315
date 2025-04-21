package com.example.Nguyenvinhson.controller;

import com.example.Nguyenvinhson.dto.ProductStoreRequest;
import com.example.Nguyenvinhson.dto.ProductUpdateRequest;
import com.example.Nguyenvinhson.entity.Product;
import com.example.Nguyenvinhson.repository.ProductRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.math.BigDecimal;
import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;

    private int getUserId() {
        return Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<Product> products = productRepository.findByDeletedAtIsNull();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable int id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getByCategory(@PathVariable Integer categoryId) {
        List<Product> list = productRepository.findByCategoryIdAndDeletedAtIsNull(categoryId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/brand/{brandId}")
    public ResponseEntity<?> getByBrand(@PathVariable Integer brandId) {
        List<Product> list = productRepository.findByBrandIdAndDeletedAtIsNull(brandId);
        return ResponseEntity.ok(list);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> create(@Valid @ModelAttribute ProductStoreRequest request) {
        Product product = new Product();
        return saveOrUpdate(product, request, true);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> update(@PathVariable int id, @ModelAttribute ProductUpdateRequest request) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) return ResponseEntity.notFound().build();
        return saveOrUpdate(optionalProduct.get(), request, false);
    }

    private ResponseEntity<?> saveOrUpdate(Product product, Object req, boolean isNew) {
        int userId = getUserId();

        if (req instanceof ProductStoreRequest request) {
            buildProductFromRequest(request, product);
            if (request.getThumbnailFile() != null && !request.getThumbnailFile().isEmpty()) {
                product.setThumbnail(saveFile(request.getThumbnailFile(), request.getName()));
            }
        } else if (req instanceof ProductUpdateRequest request) {
            buildProductFromRequest(request, product);
            if (request.getThumbnailFile() != null && !request.getThumbnailFile().isEmpty()) {
                product.setThumbnail(saveFile(request.getThumbnailFile(),
                        request.getName() != null ? request.getName() : product.getName()));
            }
        }

        if (isNew) {
            product.setCreatedBy(userId);
            product.setCreatedAt(LocalDateTime.now());
        } else {
            product.setUpdatedBy(userId);
            product.setUpdatedAt(LocalDateTime.now());
        }

        productRepository.save(product);
        return ResponseEntity.ok(product);
    }

    private void buildProductFromRequest(ProductStoreRequest req, Product product) {
        product.setName(req.getName());
        product.setPrice(req.getPrice());
        product.setPriceSale(req.getPriceSale());
        product.setDescription(req.getDescription());
        product.setCategoryId(req.getCategoryId());
        product.setBrandId(req.getBrandId());
    }

    private void buildProductFromRequest(ProductUpdateRequest req, Product product) {
        if (req.getName() != null) product.setName(req.getName());
        if (req.getPrice() != null) product.setPrice(req.getPrice());
        if (req.getPriceSale() != null) product.setPriceSale(req.getPriceSale());
        if (req.getDescription() != null) product.setDescription(req.getDescription());
        if (req.getCategoryId() != null) product.setCategoryId(req.getCategoryId());
        if (req.getBrandId() != null) product.setBrandId(req.getBrandId());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> softDelete(@PathVariable int id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) return ResponseEntity.notFound().build();

        Product product = optionalProduct.get();
        product.setDeletedAt(LocalDateTime.now());
        product.setDeletedBy(getUserId());
        productRepository.save(product);
        return ResponseEntity.ok("Đã xóa mềm");
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<?> restore(@PathVariable int id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) return ResponseEntity.notFound().build();

        Product product = optionalProduct.get();
        product.setDeletedAt(null);
        product.setUpdatedBy(getUserId());
        product.setUpdatedAt(LocalDateTime.now());

        productRepository.save(product);
        return ResponseEntity.ok("Đã khôi phục");
    }

    @DeleteMapping("/destroy/{id}")
    public ResponseEntity<?> destroy(@PathVariable int id) {
        if (!productRepository.existsById(id)) return ResponseEntity.notFound().build();
        productRepository.deleteById(id);
        return ResponseEntity.ok("Đã xóa vĩnh viễn");
    }

    public static String toSlug(String input) {
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String slug = pattern.matcher(normalized).replaceAll("");
        return slug.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
    }

    private String saveFile(MultipartFile file, String name) {
        if (file == null || file.isEmpty()) return null;

        String originalName = file.getOriginalFilename();
        if (originalName == null || !originalName.contains(".")) return null;

        try {
            String ext = originalName.substring(originalName.lastIndexOf('.'));
            String slug = toSlug(name);
            String filename = slug + "-" + System.currentTimeMillis() + ext;

            String relativePath = new File("wwwroot/uploads/product").getAbsolutePath();
            File dir = new File(relativePath);
            if (!dir.exists()) dir.mkdirs();

            File savedFile = new File(dir, filename);
            try (FileOutputStream fos = new FileOutputStream(savedFile)) {
                fos.write(file.getBytes());
            }

            return filename;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
