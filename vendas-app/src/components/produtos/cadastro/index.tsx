import { Layout } from 'components'
import React, { useEffect, useState } from 'react'
import { Input, Message } from 'components'
import { useProdutoService } from '@/app/services'
import { Produto } from 'app/models/produtos'
import {converterEmBigDecimal, formatReal} from 'app/util/money'
import { Alert } from 'components/common/message'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import Link from 'next/link'

const msgCampoObrigatorio = "Campo Obrigatório";

const validationSchema = yup.object().shape({
    sku: yup.string().trim().required(msgCampoObrigatorio),
    nome: yup.string().trim().required(msgCampoObrigatorio),
    descricao: yup.string().trim().required(msgCampoObrigatorio),
    preco: yup.number().required(msgCampoObrigatorio).moreThan(0, "Valor deve ser maior que 0,00")

})

interface FormErros {
    sku?: string;
    nome?: string;
    preco?: string;
    descricao?: string;
}

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService();
    const [ sku, setSku ] = useState<string>('')
    const [ preco, setPreco] = useState<string>('')
    const [ nome, setNome] = useState<string>('')
    const [ descricao, setDescricao] = useState<string>('')
    const [ id, setId] = useState<string>('')
    const [ cadastro, setCadastro] = useState<string>('')
    const [ messages, setMessages] = useState<Array<Alert>>([])
    const [ errors, setErrors] = useState<FormErros>({})
    const router = useRouter();
    const { id: queryId } = router.query;

    useEffect(() => {
        if (!queryId) return; 
    
        const id = Array.isArray(queryId) ? queryId[0] : queryId; 
        const idNumber = Number(id); 
    
        if (isNaN(idNumber)) return; 
    
        service.carregarProduto(idNumber).then(produtoEncontrado => {
            setId(produtoEncontrado.id || '');
            setSku(produtoEncontrado.sku || '');
            setNome(produtoEncontrado.nome || '');
            setPreco(formatReal(`${produtoEncontrado.preco}`));
            setDescricao(produtoEncontrado.descricao || '');
            setCadastro(produtoEncontrado.cadastro || '')
        });
    }, [queryId]);

    

    const submit = () => {
        const produto: Produto = {
            id,
            sku,
            preco: converterEmBigDecimal(preco),
            nome,
            descricao
        }

        validationSchema.validate(produto).then(obj => {
            setErrors({})
            if(id){
            service.atualizar(produto)
            .then(response => {
                setMessages([{
                    tipo: "success", texto: "Produto atualizado com sucesso!"
                }])
            })

            }else {
            service
               .salvar(produto)
               .then(produtoResposta => {
                  setId(produtoResposta.id ?? '')
                  setCadastro(produtoResposta.cadastro ?? '')
                  setMessages([{
                    tipo: "success", texto: "Produto cadastrado com sucesso!"
                }])
               })
            }}).catch(err => {
                const field = err.path;
                const message = err.message;

                setErrors({
                    [field]: message
                }
                )

            })

        
    }

    return (
        <Layout titulo='Produtos' mensagens={messages}>
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
                       placeholder='Digite o SKU do produto'
                       error={errors.sku}/>

                <Input label='Preço: *' 
                       columnClasses='is-half'
                       value={preco} 
                       onChange={setPreco} 
                       id='inputPreco'
                       placeholder='Digite o preço do produto'
                       currency = {true}
                       maxLength={16}
                       error={errors.preco}/>
            </div>
            <div className='columns'>
                <Input label='Nome: *' 
                        columnClasses='is-full' 
                        onChange={setNome} 
                        id='inputNome'
                        value={nome}
                        placeholder='Digite o nome do produto'
                        error={errors.nome}/>
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
                        {errors.descricao && <p className='help is-danger'>{errors.descricao}</p>}
                    </div>
                </div>
            </div>
            <div className='field is-grouped'>
                <div className='control is-link'>
                    <button className='button' onClick={submit}>
                        {id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
                <Link href="/consultas/produtos">
                    <div className='control'>
                        <button className='button'>Voltar</button>
                    </div>
                </Link>
            </div>
        </Layout>
    )
}