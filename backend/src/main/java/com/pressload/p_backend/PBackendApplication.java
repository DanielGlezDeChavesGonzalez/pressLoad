package com.pressload.p_backend;

import io.jsonwebtoken.security.Keys;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.security.Key;

@SpringBootApplication
public class PBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(PBackendApplication.class, args);

	}

//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/auth/**").allowedOrigins("http://localhost:5173");
//			}
//		};
//	}

}


//	public static void main(String[] args) {
//		Key key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256); // Genera una clave segura de 256 bits
//		String base64Key = java.util.Base64.getEncoder().encodeToString(key.getEncoded());
//		System.out.println("Generated Secure Key: " + base64Key);
//	}
