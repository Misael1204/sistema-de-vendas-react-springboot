import { Layout } from 'components'
import Link from 'next/link'
import Router from 'next/router'
import { TabelaProdutos } from './tabela'
import { Produto } from 'app/models/produtos'
import useSWR from 'swr'
import { httpClient } from 'app/http'
import { AxiosResponse } from 'axios'
import { Loader } from '@/components/common/loader'
import { useProdutoService } from 'app/services/produto.service'
import { useState } from 'react'
import { Alert } from '@/components/common/message'
import { useEffect } from 'react'


 export const ListagemProdutos: React.FC = () => {

    const service = useProdutoService();
    const [ messages, setMessages] = useState<Array<Alert>>([])
    const { data: result } = useSWR<AxiosResponse<Produto[]>>('/api/produtos', (url: string) => httpClient.get(url))
    const [ lista, setLista ] = useState<Produto[]>([]);
    
    useEffect( () => {
        setLista(result?.data || [])
    }, [result])

    const editar = (produto: Produto) => {
        const url = `/cadastros/produtos?id=${produto.id}`
        Router.push(url)
    }

    const deletar = (produto : Produto) => {
        service.deletar(`${produto.id}`).then( response => {
            setMessages([
                {tipo: "success", texto: "Produto Excluido com sucesso"  }
            ])
            const listaAlterada: Produto[] = lista?.filter( p => p.id != produto.id)
            setLista(listaAlterada)
        })

    }
   
    return (
        <Layout titulo='Listagem Produtos' mensagens={messages}>
            <Link href="/cadastros/produtos">
               <button className='button is-warning'>Novo Produto</button>
            </Link>
            <br />
            <br />
            <Loader show={!result} />
            <TabelaProdutos onDelete={deletar} onEdit={editar} produtos={lista || []}/>
        </Layout>
    )

}