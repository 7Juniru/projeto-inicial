package com.pantryguard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // CSRF desabilitado porque a API é stateless (JSON REST)
            .csrf(csrf -> csrf.disable())

            // CORS configurado para aceitar apenas origens válidas
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // Headers de segurança
            .headers(headers -> headers
                // Evita que o site seja embarcado em iframes (proteção contra Clickjacking)
                .frameOptions(frame -> frame.deny())
                // Evita que o browser interprete conteúdo com MIME diferente do declarado
                .contentTypeOptions(cto -> {})
                // Política de referência — envia apenas a origem, não a URL completa
                .referrerPolicy(ref -> ref.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN))
                // Content-Security-Policy — restringe scripts/styles a mesma origem + CDNs usadas
                .contentSecurityPolicy(csp -> csp.policyDirectives(
                    "default-src 'self'; " +
                    "script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net; " +
                    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
                    "font-src 'self' https://fonts.gstatic.com; " +
                    "img-src 'self' data: https://*.googleusercontent.com; " +
                    "connect-src 'self' https://www.googleapis.com https://accounts.google.com; " +
                    "frame-src https://accounts.google.com;"
                ))
                // Permissions-Policy — desabilita funcionalidades sensíveis
                .permissionsPolicy(pp -> pp.policy(
                    "camera=(), microphone=(self), geolocation=(), payment=()"
                ))
            )

            // Permitir acesso público a todos os endpoints (autenticação é via app-level)
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        // Permitir localhost e links de túnel (localhost.run)
        config.setAllowedOriginPatterns(List.of(
            "http://localhost:*",
            "https://*.lhr.life",
            "https://*.localhost.run"
        ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
