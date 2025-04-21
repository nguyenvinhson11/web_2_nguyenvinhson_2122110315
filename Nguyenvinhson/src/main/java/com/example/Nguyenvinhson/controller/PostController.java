package com.example.Nguyenvinhson.controller;

import com.example.Nguyenvinhson.entity.Post;
import com.example.Nguyenvinhson.repository.PostRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.text.Normalizer;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {

    private final PostRepository postRepository;

    @GetMapping
    public List<Post> index() {
        return postRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Integer id) {
        Optional<Post> post = postRepository.findById(id);
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> store(
            @RequestParam String title,
            @RequestParam String slug,
            @RequestParam String description,
            @RequestParam String detail,
            @RequestParam String type,
            @RequestParam Integer topicId,
            @RequestParam(required = false) MultipartFile thumbnail
    ) throws IOException {
        String fileName = saveThumbnail(thumbnail, title);

        Post post = new Post();
        post.setTitle(title);
        post.setSlug(toSlug(title));
        post.setDescription(description);
        post.setDetail(detail);
        post.setType(type);
        post.setTopicId(topicId);
        post.setThumbnail(fileName);
        post.setCreatedAt(LocalDateTime.now());

        postRepository.save(post);
        return ResponseEntity.ok(post);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> update(
            @PathVariable Integer id,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String slug,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String detail,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Integer topicId,
            @RequestParam(required = false) MultipartFile thumbnail
    ) throws IOException {
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isEmpty()) return ResponseEntity.notFound().build();

        Post post = optionalPost.get();

        if (title != null) post.setTitle(title);
        if (slug != null) post.setSlug(slug);
        if (description != null) post.setDescription(description);
        if (detail != null) post.setDetail(detail);
        if (type != null) post.setType(type);
        if (topicId != null) post.setTopicId(topicId);

        if (thumbnail != null && !thumbnail.isEmpty()) {
            String fileName = saveThumbnail(thumbnail, post.getTitle());
            post.setThumbnail(fileName);
        }

        post.setUpdatedAt(LocalDateTime.now());
        postRepository.save(post);
        return ResponseEntity.ok(post);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isEmpty()) return ResponseEntity.notFound().build();

        postRepository.delete(post.get());
        return ResponseEntity.ok("Đã xóa bài viết");
    }

    private String saveThumbnail(MultipartFile file, String title) throws IOException {
        if (file == null || file.isEmpty()) return null;

        String uploadDir = new File("wwwroot/uploads/post").getAbsolutePath();
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        String ext = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String slug = toSlug(title);
        String fileName = slug + "-" + System.currentTimeMillis() + "." + ext;

        File savedFile = new File(dir, fileName);
        file.transferTo(savedFile);

        return fileName;
    }

    public static String toSlug(String input) {
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(normalized).replaceAll("").toLowerCase()
                .replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
    }
}
