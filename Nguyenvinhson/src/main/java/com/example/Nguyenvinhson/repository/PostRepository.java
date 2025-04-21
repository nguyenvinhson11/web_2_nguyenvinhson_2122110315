package com.example.Nguyenvinhson.repository;

import com.example.Nguyenvinhson.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Integer> {
}
