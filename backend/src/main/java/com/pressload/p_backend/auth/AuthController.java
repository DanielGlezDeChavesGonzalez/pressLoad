package com.pressload.p_backend.auth;

import com.pressload.p_backend.security.jwt.JwtService;
import com.pressload.p_backend.user.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterDto RegisterUserDto) {
        return ResponseEntity.ok().body(authService.registerUser(RegisterUserDto));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginDto LoginUserDto) {
        return ResponseEntity.ok().body(authService.authenticateUser(LoginUserDto));
    }

    @PostMapping("/refresh")
    public void refresh(HttpServletRequest request, HttpServletResponse response) throws IOException {
        authService.refreshToken(request,response);

    }

    @PostMapping("/logout")
    public void logout(@RequestBody LoginDto LoginUserDto) {

    }
}
