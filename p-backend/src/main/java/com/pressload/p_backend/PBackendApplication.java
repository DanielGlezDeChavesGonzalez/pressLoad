package com.pressload.p_backend;

import io.jsonwebtoken.security.Keys;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.security.Key;

@SpringBootApplication
public class PBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(PBackendApplication.class, args);

	}

}


//	public static void main(String[] args) {
//		Key key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256); // Genera una clave segura de 256 bits
//		String base64Key = java.util.Base64.getEncoder().encodeToString(key.getEncoded());
//		System.out.println("Generated Secure Key: " + base64Key);
//	}
