package com.example.Nguyenvinhson.controller;

import com.example.Nguyenvinhson.dto.TopicStoreRequest;
import com.example.Nguyenvinhson.dto.TopicUpdateRequest;
import com.example.Nguyenvinhson.entity.Topic;
import com.example.Nguyenvinhson.repository.TopicRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/topic")
@RequiredArgsConstructor
public class TopicController {

    private final TopicRepository topicRepository;

    // ✅ Lấy danh sách tất cả topic
    @GetMapping
    public ResponseEntity<?> index() {
        List<Topic> list = topicRepository.findAll();
        return ResponseEntity.ok(list);
    }

    // ✅ Lấy chi tiết topic theo ID
    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable int id) {
        Optional<Topic> topic = topicRepository.findById(id);
        return topic.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Tạo mới topic
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody TopicStoreRequest request) {
        Topic topic = Topic.builder()
                .name(request.getName())
                .description(request.getDescription())
                .createdBy(request.getCreatedBy())
                .createdAt(LocalDateTime.now())
                .build();

        topicRepository.save(topic);
        return ResponseEntity.ok(topic);
    }

    // ✅ Cập nhật topic
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @Valid @RequestBody TopicUpdateRequest request) {
        Optional<Topic> optional = topicRepository.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Topic topic = optional.get();
        topic.setName(request.getName());
        topic.setDescription(request.getDescription());
        topic.setUpdatedBy(request.getUpdatedBy());
        topic.setUpdatedAt(LocalDateTime.now());

        topicRepository.save(topic);
        return ResponseEntity.ok(topic);
    }

    // ✅ Xóa topic
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        if (!topicRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        topicRepository.deleteById(id);
        return ResponseEntity.ok("Đã xóa topic");
    }
}
