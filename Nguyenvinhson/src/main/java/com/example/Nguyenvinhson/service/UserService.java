package com.example.Nguyenvinhson.service;

import com.example.Nguyenvinhson.entity.User;

import java.util.Optional;

public interface UserService {
    Optional<User> login(String email, String password);

    Optional<User> findByEmail(String email);

    // UserService.java
    Optional<User> findById(Integer id);

}
