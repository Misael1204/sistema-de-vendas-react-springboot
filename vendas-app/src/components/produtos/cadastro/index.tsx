import { Layout } from 'components'
import React, { useState } from 'react'
import { Input } from 'components'
import { useProdutoService } from '@/app/services'
import { Produto } from 'app/models/produtos'
import {converterEmBigDecimal} from 'app/util/money'

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService();
    const [ sku, setSku ] = useState<string>('')
    const [ preco, setPreco] = useState<string>('')
    const [ nome, setNome] = useState<string>('')
    const [ descricao, setDescricao] = useState<string>('')
    const [ id, setId] = useState<string>('')
    const [ cadastro, setCadastro] = useState<string>('')

    const submit = () => {
        const produto: Produto = {
            id,
            sku,
            preco: converterEmBigDecimal(preco),
            nome,
            descricao
        }

        if(id){
            service.atualizar(produto)
            .then(response => console.log("Atualizado"))

        }else {
            service
               .salvar(produto)
               .then(produtoResposta => {
                  setId(produtoResposta.id ?? '')
                  setCadastro(produtoResposta.cadastro ?? '')
               })
        }
    }

    return (
        <Layout titulo='Cadastro de Produtos'>
            {id &&
                <div className='columns'>
                    <Input label='Codigo:' 
                       columnClasses='is-half' 
                       value={id} 
                       id='inputId'
                       disabled
                       />

                    <Input label='Data Cadastro:' 
                       columnClasses='is-half'
                       value={cadastro} 
                       id='inputCadastro'
                       disabled
                       />
                </div>
            }


            <div className='columns'>
                <Input label='SKU: *' 
                       columnClasses='is-half' 
                       onChange={setSku}
                       value={sku} 
                       id='inputSku'
                       placeholder='Digite o SKU do produto'/>

                <Input label='Preço: *' 
                       columnClasses='is-half'
                       value={preco} 
                       onChange={setPreco} 
                       id='inputPreco'
                       placeholder='Digite o preço do produto'
                       currency = {true}
                       maxLength={16}/>
            </div>
            <div className='columns'>
                <Input label='Nome: *' 
                        columnClasses='is-full' 
                        onChange={setNome} 
                        id='inputNome'
                        value={nome}
                        placeholder='Digite o nome do produto'/>
            </div>
            <div className='columns'>
                <div className="field column is-full">
                    <label className='label' htmlFor='inputDesc'>Descrição: *</label>
                    <div className='control'>
                        <textarea
                            id='inputDesc'
                            value={descricao} 
                            className="textarea" 
                            placeholder='Digite a descrição do Produto'
                            onChange={e => setDescricao(e.target.value)} 
                        />
                    </div>
                </div>
            </div>
            <div className='field is-grouped'>
                <div className='control is-link'>
                    <button className='button' onClick={submit}>
                        {id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
                <div className='control'>
                    <button className='button'>Voltar</button>
                </div>
            </div>
        </Layout>
    )
}