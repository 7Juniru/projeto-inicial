package com.pantryguard.controller;

import com.pantryguard.model.Product;
import com.pantryguard.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*") // Permite chamadas de origens distintas se necessário
public class ProductController {

    private final ProductRepository productRepository;

    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Listar todos os produtos
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Cadastrar ou atualizar produto
    @PostMapping
    public Product saveProduct(@RequestBody Product product) {
        // O JPA automaticamente executa UPDATE se o ID já existir, ou INSERT se for novo
        return productRepository.save(product);
    }

    // Excluir produto pelo ID
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) {
        productRepository.deleteById(id);
    }
}
