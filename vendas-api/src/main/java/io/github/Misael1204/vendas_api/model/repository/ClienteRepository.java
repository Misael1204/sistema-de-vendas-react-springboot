package io.github.Misael1204.vendas_api.model.repository;

import io.github.Misael1204.vendas_api.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository  extends JpaRepository<Cliente, Long> {
}
