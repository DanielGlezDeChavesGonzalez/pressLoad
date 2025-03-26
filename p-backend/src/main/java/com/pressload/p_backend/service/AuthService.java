package com.pressload.p_backend.service;

import com.pressload.p_backend.entity.Role;
import com.pressload.p_backend.entity.User;
import com.pressload.p_backend.repository.UserRepository;
import com.pressload.p_backend.request.auth.AuthenticationRequest;
import com.pressload.p_backend.request.auth.RegisterRequest;
import com.pressload.p_backend.response.AuthenticationResponse;
import com.pressload.p_backend.service.jwt.JwtService;
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

    public AuthenticationResponse register(RegisterRequest request) {
        System.out.println(request.getRole()  + " ROL");
        var role = request.getRole() == 1 ? Role.USER : request.getRole() == 2 ? Role.PAID_USER : Role.ADMIN;
        System.out.println(role  + " ROL");

        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();
        if(userRepository.findByUsername(request.getUsername()).isEmpty()){
            userRepository.save(user);
        }
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()));
        var user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

}