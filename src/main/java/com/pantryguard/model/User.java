package com.pantryguard.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String password;
    private String whatsapp;





    // Construtores
    public User() {}
    
    public User(String nome, String email, String whatsapp, String password) {
        this.nome = nome;
        this.email = email;
        this.whatsapp = whatsapp;
        this.password = password;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWhatsapp() {
        return whatsapp;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }
}
