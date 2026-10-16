package com.pantryguard.controller;

import com.pantryguard.model.User;
import com.pantryguard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Cadastro ou login com email/senha.
     * Se o email já existir, verifica a senha (hash) e retorna o usuário.
     * Se o email não existir, cria um novo usuário com a senha criptografada.
     */
    @PostMapping
    public ResponseEntity<?> registerOrLoginUser(@RequestBody User user) {
        // Validação de entrada
        if (user.getEmail() == null || user.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body("{\"error\": \"Email é obrigatório.\"}");
        }
        if (user.getPassword() == null || user.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body("{\"error\": \"Senha é obrigatória.\"}");
        }

        User existing = userRepository.findByEmail(user.getEmail());

        if (existing != null) {
            // Email já cadastrado: verifica senha com BCrypt
            if (passwordEncoder.matches(user.getPassword(), existing.getPassword())) {
                // Não expõe hash da senha na resposta
                existing.setPassword(null);
                return ResponseEntity.ok(existing);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("{\"error\": \"Senha incorreta. Tente novamente.\"}");
            }
        }

        // Novo usuário: criptografa a senha antes de salvar
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User saved = userRepository.save(user);
        saved.setPassword(null); // Não retorna hash ao cliente
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * Login dedicado para não confundir com registro.
     * Retorna 200 se credenciais corretas, 401 caso contrário.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        if (user.getEmail() == null || user.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body("{\"error\": \"Email é obrigatório.\"}");
        }

        User existing = userRepository.findByEmail(user.getEmail());
        if (existing == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("{\"error\": \"Email não encontrado.\"}");
        }
        if (!passwordEncoder.matches(user.getPassword(), existing.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("{\"error\": \"Senha incorreta.\"}");
        }
        existing.setPassword(null); // Não expõe hash
        return ResponseEntity.ok(existing);
    }

    /**
     * Cadastro/login social com Google — idempotente por email.
     */
    @PostMapping("/google")
    public ResponseEntity<User> registerOrLoginGoogle(@RequestBody User user) {
        if (user.getEmail() == null || user.getEmail().isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        User existing = userRepository.findByEmail(user.getEmail());
        if (existing != null) {
            existing.setPassword(null);
            return ResponseEntity.ok(existing);
        }
        // Gera senha aleatória criptografada para contas Google (não usada para login)
        user.setPassword(passwordEncoder.encode("GOOGLE_OAUTH_" + java.util.UUID.randomUUID()));
        User saved = userRepository.save(user);
        saved.setPassword(null);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Endpoint GET /api/users REMOVIDO por segurança
    // Listar todos os usuários expõe dados sensíveis e foi desabilitado.
}

