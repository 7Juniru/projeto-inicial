package com.pantryguard.controller;

import com.pantryguard.model.User;
import com.pantryguard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    /**
     * Register a new user with email and phone number (WhatsApp / SMS).
     */
    @PostMapping
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        // Simple save; in a real app you would validate and encrypt passwords, etc.
        User saved = userRepository.save(user);
        return ResponseEntity.ok(saved);
    }

    /**
     * Retrieve all registered users.
     */
    @GetMapping
    public ResponseEntity<Iterable<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }
}
