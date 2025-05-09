import Layout from "@/components/layout";
import { Input, InputCPF } from "@/components/common";
import { useFormik } from "formik";
import { useState } from "react";
import { Cliente } from "@/app/models/clientes";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { Page } from "@/app/models/common/page";
import { useClienteService } from "@/app/services";

interface ConsultaClientesForm {
  nome?: string;
  cpf?: string;
}

export const ListagemClientes: React.FC = () => {
  const service = useClienteService();
  const [loading, setLoading] = useState<boolean>(false); // Corrigido: setLoading
  const [clientes, setClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0, // Corrigido: first
    number: 0,
    size: 10,
    totalElements: 0,
  });

  const handleSubmit = (filtro: ConsultaClientesForm) => {
    handlePage(undefined); // Evita passar `null`
  };

  const { handleSubmit: formikSubmit, values: filtro, handleChange } = useFormik<ConsultaClientesForm>({
    onSubmit: handleSubmit,
    initialValues: { nome: "", cpf: "" },
  });

  const handlePage = (event?: DataTablePageEvent) => { // Permite que `event` seja opcional
    setLoading(true); 
    service.find(filtro.nome ?? "", filtro.cpf ?? "", event?.page, event?.rows)
      .then((result) => {
        setClientes({ ...result, first: event?.first ?? 0 }); // Corrigido: fallback para 0 se undefined
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout titulo="Listagem Clientes">
      <form onSubmit={formikSubmit}>
        <div className="columns">
          <Input
            label="Nome"
            columnClasses="is-half"
            id="nome"
            name="nome"
            onChange={handleChange}
            autoComplete="off"
            value={filtro.nome}
          />
          <Input
            label="CPF"
            columnClasses="is-half"
            id="cpf"
            autoComplete="off"
            name="cpf"
            onChange={handleChange}
            value={filtro.cpf}
          />
        </div>
        <div className="field is-grouped">
          <div className="control is-link">
            <button type="submit" className="button is-success">
              Consultar
            </button>
          </div>
        </div>
      </form>
      <br />
      <div className="columns">
        <div className="is-full">
          <DataTable
            value={clientes.content}
            totalRecords={clientes.totalElements}
            lazy={true}
            paginator={true}
            first={clientes.first} // Corrigido: first
            rows={clientes.size}
            onPage={handlePage}
            loading={loading}
            emptyMessage="Nenhum registro"
          >
            <Column field="id" header="Código" />
            <Column field="nome" header="Nome" />
            <Column field="cpf" header="CPF" />
            <Column field="email" header="E-mail" />
          </DataTable>
        </div>
      </div>
    </Layout>
  );
};