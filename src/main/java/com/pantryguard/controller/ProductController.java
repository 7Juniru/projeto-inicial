package com.pantryguard.controller;

import com.pantryguard.model.Product;
import com.pantryguard.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductRepository productRepository;

    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Retorna apenas os produtos do usuário informado via query param.
     * Se não houver userId, retorna lista vazia por segurança.
     */
    @GetMapping
    public List<Product> getProductsByUser(@RequestParam(required = false) String userId) {
        if (userId == null || userId.isBlank()) {
            return List.of();
        }
        return productRepository.findByUserId(userId);
    }

    /**
     * Cadastra ou atualiza um produto.
     * O userId deve vir no corpo do produto para garantir propriedade.
     */
    @PostMapping
    public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
        Product saved = productRepository.save(product);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    /**
     * Exclui produto pelo ID, validando que pertence ao usuário.
     */
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteProduct(
            @PathVariable String id,
            @RequestParam(required = false) String userId) {
        if (userId != null && !userId.isBlank()) {
            productRepository.deleteByIdAndUserId(id, userId);
        } else {
            // Fallback sem userId (compatibilidade)
            productRepository.deleteById(id);
        }
        return ResponseEntity.noContent().build();
    }
}
