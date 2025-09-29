package com.pressload.p_backend.auth;

import com.pressload.p_backend.security.jwt.JwtService;
import com.pressload.p_backend.user.Role;
import com.pressload.p_backend.user.User;
import com.pressload.p_backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
//    private final TokenRepository tokenRepository;

    public AuthResponse registerUser(RegisterDto registerUserDto) {
        var user = User.builder()
                .username(registerUserDto.getUsername())
                .email(registerUserDto.getEmail())
                .password(passwordEncoder.encode(registerUserDto.getPassword()))
//                .role(registerUserDto.getRole())
                .role(Role.USER)
                .build();

        var savedUser = userRepository.save(user);
        var jwToken = jwtService.generateToken(user);
//        var refreshToken = jwtService.generateRefreshToken(user);
//        saveUserToken(savedUser,jwToken);

        return AuthResponse.builder()
                .accessToken(jwToken)
//                .refreshToken(refreshToken)
                .build();
    }

//    private void saveUserToken(User savedUser, String jwToken) {
//    }

    public AuthResponse authenticateUser(LoginDto loginUserDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUserDto.getUsername(),
                        loginUserDto.getPassword()
                )
        );

        var user = userRepository.findByUsername(loginUserDto.getUsername()).orElseThrow();
        var jwToken = jwtService.generateToken(user);

        return AuthResponse.builder()
                .accessToken(jwToken)
                .build();
    }
}
