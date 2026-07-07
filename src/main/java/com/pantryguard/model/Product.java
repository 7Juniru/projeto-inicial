package com.pantryguard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Index;

@Entity
@Table(name = "produtos", indexes = {
    @Index(name = "idx_produto_user_id", columnList = "user_id")
})
@JsonIgnoreProperties(ignoreUnknown = true)
public class Product {

    @Id
    private String id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String categoria;

    @Column(name = "data_validade", nullable = false)
    private String data_validade;

    @Column(nullable = false)
    private Integer quantidade;

    @Column(name = "criado_em")
    private String criado_em;

    @Column(name = "favorito", nullable = false, columnDefinition = "boolean default false")
    private boolean favorito = false;

    /** Email do usuário dono deste produto — garante isolamento por usuário */
    @Column(name = "user_id")
    private String userId;

    // Construtores
    public Product() {
    }

    public Product(String id, String nome, String categoria, String data_validade, Integer quantidade, String criado_em) {
        this.id = id;
        this.nome = nome;
        this.categoria = categoria;
        this.data_validade = data_validade;
        this.quantidade = quantidade;
        this.criado_em = criado_em;
        this.favorito = false;
    }

    public Product(String id, String nome, String categoria, String data_validade, Integer quantidade, String criado_em, boolean favorito) {
        this.id = id;
        this.nome = nome;
        this.categoria = categoria;
        this.data_validade = data_validade;
        this.quantidade = quantidade;
        this.criado_em = criado_em;
        this.favorito = favorito;
    }

    // Getters e Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getData_validade() {
        return data_validade;
    }

    public void setData_validade(String data_validade) {
        this.data_validade = data_validade;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public String getCriado_em() {
        return criado_em;
    }

    public void setCriado_em(String criado_em) {
        this.criado_em = criado_em;
    }

    public boolean isFavorito() {
        return favorito;
    }

    public void setFavorito(boolean favorito) {
        this.favorito = favorito;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
