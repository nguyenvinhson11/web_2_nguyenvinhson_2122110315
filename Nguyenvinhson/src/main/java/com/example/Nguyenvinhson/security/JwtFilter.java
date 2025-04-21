package com.example.Nguyenvinhson.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

                String authHeader = request.getHeader("Authorization");

                if (authHeader != null) {
                    // Nếu chưa có Bearer thì tự thêm vào
                    String token = authHeader.startsWith("Bearer ")
                        ? authHeader.substring(7)
                        : authHeader;
                
                    if (jwtUtil.validateToken(token)) {
                        Integer userId = jwtUtil.extractUserId(token);
                        request.setAttribute("userId", userId);
                
                        UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                userId.toString(), null, List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));
                
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    } else {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.getWriter().write("{\"error\": \"Token không hợp lệ hoặc thiếu!\"}");
                        return;
                    }
                }
                
        filterChain.doFilter(request, response);
    }
}
