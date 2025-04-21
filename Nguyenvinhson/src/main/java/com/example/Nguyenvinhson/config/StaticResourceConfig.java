package com.example.Nguyenvinhson.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.lang.NonNull;
@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**") // URL sẽ truy cập kiểu: /uploads/xxx.jpg
                .addResourceLocations("file:./wwwroot/uploads/"); // đường dẫn thư mục thật trên máy
    }
}
