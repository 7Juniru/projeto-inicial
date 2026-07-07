package com.pantryguard.controller;

import com.pantryguard.model.User;
import com.pantryguard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    /**
     * Cadastro ou login com email/senha.
     * Se o email já existir, verifica a senha e retorna o usuário.
     * Se o email não existir, cria um novo usuário.
     */
    @PostMapping
    public ResponseEntity<?> registerOrLoginUser(@RequestBody User user) {
        User existing = userRepository.findByEmail(user.getEmail());

        if (existing != null) {
            // Email já cadastrado: verifica senha
            if (existing.getPassword() != null && existing.getPassword().equals(user.getPassword())) {
                return ResponseEntity.ok(existing);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("{\"error\": \"Senha incorreta. Tente novamente.\"}");
            }
        }

        // Novo usuário: cadastra
        User saved = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * Login dedicado para não confundir com registro.
     * Retorna 200 se credenciais corretas, 401 caso contrário.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User existing = userRepository.findByEmail(user.getEmail());
        if (existing == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"Email não encontrado.\"}");
        }
        if (!existing.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("{\"error\": \"Senha incorreta.\"}");
        }
        return ResponseEntity.ok(existing);
    }

    /**
     * Cadastro/login social com Google — idempotente por email.
     */
    @PostMapping("/google")
    public ResponseEntity<User> registerOrLoginGoogle(@RequestBody User user) {
        User existing = userRepository.findByEmail(user.getEmail());
        if (existing != null) {
            return ResponseEntity.ok(existing);
        }
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            user.setPassword("GOOGLE_OAUTH_" + java.util.UUID.randomUUID().toString());
        }
        User saved = userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * Listar todos os usuários (admin).
     */
    @GetMapping
    public ResponseEntity<Iterable<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }
}
