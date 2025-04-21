package com.example.Nguyenvinhson.security;

import com.example.Nguyenvinhson.config.JwtProperties;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtProperties jwtProperties;
    private Key key;

    // ✅ Khởi tạo key từ chuỗi secret
    @PostConstruct
    public void init() {
        
        this.key = Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8));

    }

    // ✅ Tạo JWT token với userId làm subject
    public String generateToken(Integer userId) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(String.valueOf(userId)) // 🟢 Lưu userId ở subject
                .setIssuer(jwtProperties.getIssuer())
                .setAudience(jwtProperties.getAudience())
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + jwtProperties.getExpiryMinutes() * 60 * 1000))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ Lấy userId từ token (nằm trong subject)
    public Integer extractUserId(String token) {
        Claims claims = getClaims(token);
        return Integer.parseInt(claims.getSubject());
    }

    // ❌ Nếu bố không dùng email → nên bỏ luôn cái này
    // public String extractUsername(String token) {
    //     return getClaims(token).getSubject(); // thực ra chính là userId dạng string
    // }

    // ✅ Kiểm tra token hợp lệ
    public boolean validateToken(String token) {
        try {
            getClaims(token);
            System.out.println("✅ Token hợp lệ");
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("❌ Token hết hạn: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("❌ Token không hỗ trợ: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("❌ Token sai định dạng: " + e.getMessage());
        } catch (SecurityException e) {
            System.out.println("❌ Token không đúng chữ ký: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("❌ Token rỗng hoặc null: " + e.getMessage());
        }
        return false;
    }
    

    // ✅ Lấy toàn bộ thông tin trong token
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
