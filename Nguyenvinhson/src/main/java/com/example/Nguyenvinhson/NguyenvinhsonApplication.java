package com.example.Nguyenvinhson;

import com.example.Nguyenvinhson.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(JwtProperties.class)
public class NguyenvinhsonApplication {
	public static void main(String[] args) {
		SpringApplication.run(NguyenvinhsonApplication.class, args);
	}
}
