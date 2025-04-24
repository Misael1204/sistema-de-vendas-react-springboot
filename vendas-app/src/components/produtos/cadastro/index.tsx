import { Layout } from 'components'
import React, { useState } from 'react'
import { Input } from 'components'

export const CadastroProdutos: React.FC = () => {
    const [ sku, setSku ] = useState<string>('')
    const [ preco, setPreco] = useState<string>('')
    const [ nome, setNome] = useState<string>('')
    const [ descricao, setDescricao] = useState<string>('')

    const submit = () => {
        const produto = {
            sku,
            preco,
            nome,
            descricao
        }
        console.log(produto)
    }

    return (
        <Layout titulo='Cadastro de Produtos'>
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
                       placeholder='Digite o preço do produto'/>
            </div>
            <div className='columns'>
                <Input label='Nome: *' 
                        columnClasses='is-half' 
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
                    <button className='button' onClick={submit}>Salvar</button>
                </div>
                <div className='control'>
                    <button className='button'>Voltar</button>
                </div>
            </div>
        </Layout>
    )
}