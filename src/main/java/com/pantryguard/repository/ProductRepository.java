package com.pantryguard.repository;

import com.pantryguard.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    /** Retorna apenas os produtos que pertencem ao usuário informado */
    List<Product> findByUserId(String userId);

    /** Exclui produto apenas se ele pertencer ao usuário informado */
    void deleteByIdAndUserId(String id, String userId);
}
