package com.pantryguard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "produtos")
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
}
