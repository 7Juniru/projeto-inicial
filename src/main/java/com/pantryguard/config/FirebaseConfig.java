package com.pantryguard.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    @Value("${firebase.config.path}")
    private String configPath;

    private final ResourceLoader resourceLoader;

    public FirebaseConfig(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @PostConstruct
    public void initialize() {
        try {
            Resource resource = resourceLoader.getResource(configPath);
            if (!resource.exists()) {
                System.out.println("[Firebase Warning] Arquivo 'serviceAccountKey.json' não encontrado na pasta resources. Firebase Push operará em modo de simulação (mock).");
                return;
            }
            try (InputStream is = resource.getInputStream()) {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(is))
                        .build();

                if (FirebaseApp.getApps().isEmpty()) {
                    FirebaseApp.initializeApp(options);
                    System.out.println("Firebase Admin SDK inicializado com sucesso.");
                }
            }
        } catch (Exception e) {
            System.err.println("Erro ao inicializar Firebase Admin SDK: " + e.getMessage());
        }
    }
}
