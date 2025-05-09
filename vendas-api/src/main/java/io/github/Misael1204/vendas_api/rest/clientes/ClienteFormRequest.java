package io.github.Misael1204.vendas_api.rest.clientes;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.github.Misael1204.vendas_api.model.Cliente;

import java.time.LocalDate;

public class ClienteFormRequest {

    private Long id;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate nascimento;

    private String cpf;
    private String nome;
    private String endereco;
    private String telefone;
    private String email;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate cadastro;

    public  ClienteFormRequest() {

    }

    public ClienteFormRequest(Long id, LocalDate nascimento, String cpf, String nome, String endereco, String telefone, String email, LocalDate cadastro) {
        this.id = id;
        this.nascimento = nascimento;
        this.cpf = cpf;
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.email = email;
        this.cadastro = cadastro;
    }

    public ClienteFormRequest(String email, String telefone, String endereco, String nome, String cpf, LocalDate nascimento) {
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
        this.nome = nome;
        this.cpf = cpf;
        this.nascimento = nascimento;
    }

    public ClienteFormRequest(Long id, String nome, String cpf, LocalDate nascimento, String email, String endereco, String telefone) {
        this.id = id;
        this.nascimento = nascimento;
        this.cpf = cpf;
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getNascimento() {
        return nascimento;
    }

    public void setNascimento(LocalDate nascimento) {
        this.nascimento = nascimento;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getCadastro() {
        return cadastro;
    }

    public void setCadastro(LocalDate cadastro) {
        this.cadastro = cadastro;
    }

    public Cliente toModel (){
        return new Cliente(id, nascimento, cpf, nome, endereco, telefone, email, cadastro);
    }

    public static  ClienteFormRequest fromModel(Cliente cliente) {
        return new ClienteFormRequest(cliente.getId(), cliente.getNome(), cliente.getCpf(), cliente.getNascimento(), cliente.getEmail(), cliente.getEndereco(), cliente.getTelefone());
    }
}
