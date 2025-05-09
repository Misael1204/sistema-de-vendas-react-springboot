import { useEffect, useState } from 'react'
import { Layout } from 'components'
import { ClienteForm } from './form'
import { Cliente } from 'app/models/clientes'
import { useClienteService } from 'app/services'
import { Alert } from 'components/common/message'
import { useRouter } from 'next/router'

export const CadastroCliente: React.FC = () => {
    const [cliente, setCliente] = useState<Cliente>({});
    const [messages, setMessages] = useState<Array<Alert>>([]);
    const service = useClienteService();
    // const router = useRouter();
    // const { id } = router.query;

    // useEffect(() => {
    //     if (id && typeof id === 'string') {
    //         service.carregarCliente(Number(id)) // Convertendo id para número
    //             .then(clienteEncontrado => setCliente(clienteEncontrado))
    //     }
    // }, [id]);

    const handleSubmit = (values: Cliente) => {
        console.log('Dados enviados:', values);

        if (values.id) {
            service.atualizar(values).then(() => {
                setMessages([{ tipo: "success", texto: "Cliente atualizado com sucesso!" }]);
            });
        } else {
            service.salvar(values).then(clienteSalvo => {
                setCliente(clienteSalvo);
                setMessages([{ tipo: "success", texto: "Cliente salvo com sucesso!" }]);
            });
        }
    };

    return (
        <Layout titulo="Clientes" mensagens={messages}>
            <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
        </Layout>
    )
}