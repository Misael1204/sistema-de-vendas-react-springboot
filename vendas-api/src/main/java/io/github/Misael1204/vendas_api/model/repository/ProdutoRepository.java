package io.github.Misael1204.vendas_api.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.Misael1204.vendas_api.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{

}
