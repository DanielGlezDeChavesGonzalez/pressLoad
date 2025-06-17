//package com.pressload.p_backend;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//@EnableWebMvc  // Asegura que WebMvcConfigurer se aplique
//public class CorsConfig {
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**") // Aplica CORS a todos los endpoints
//                        .allowedOrigins("http://localhost:5173") // Permite peticiones desde el frontend
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos permitidos
//                        .allowedHeaders("*") // Permite todos los headers
//                        .allowCredentials(true); // Permite envío de cookies y autenticación
//            }
//        };
//    }
//}
