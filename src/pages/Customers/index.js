
import { useState } from 'react';
import './customers.css';
import Title from '../../components/Title';
import Header from '../../components/Header';
import firebase from '../../services/firebaseConnection';
import { FiUser } from 'react-icons/fi';

import { toast } from 'react-toastify';

export default function Customers(){
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');



  async function handleAdd(e){
    e.preventDefault();
    
    if(nomeFantasia !== '' && cnpj !== '' && endereco !== ''){
      await firebase.firestore().collection('customers')
      .add({
        nomeFantasia: nomeFantasia,
        cnpj: cnpj,
        endereco: endereco
      })
      .then(()=>{
        setNomeFantasia('');
        setCnpj('');
        setEndereco('');
        toast.info('Aluno cadastrado com sucesso!');
      })
      .catch((error)=>{
        console.log(error);
        toast.error('Erro ao cadastrar esse aluno.');
      })
    }else{
      toast.error('Preencha todos os campos!')
    }

  }

  return(
    <div>
      <Header/>

    <div className="content">
      <Title name="Aluno">
        <FiUser size={25} />
      </Title>

      <div className="container">
        <form className="form-profile customers" onSubmit={handleAdd}>
          <label>Nome Completo</label>
          <input type="text" placeholder="Nome" value={nomeFantasia} onChange={ (e) => setNomeFantasia(e.target.value) } />

          <label>CPF</label>
          <input type="text" placeholder="Seu CPF" value={cnpj} onChange={ (e) => setCnpj(e.target.value) } />

          <label>Endereço</label>
          <input type="text" placeholder="Endereço do aluno" value={endereco} onChange={ (e) => setEndereco(e.target.value) } />

          <button type="submit">Cadastrar</button>

        </form>
      </div>

    </div>

    </div>
  )
}