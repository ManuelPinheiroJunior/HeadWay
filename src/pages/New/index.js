
import { useState, useEffect, useContext } from 'react';

import firebase from '../../services/firebaseConnection';
import { useHistory, useParams } from 'react-router-dom';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';

import './new.css';
import { FiPlusCircle } from 'react-icons/fi'

export default function New(){
  const { id } = useParams();
  const history = useHistory();

  const [loadCustomers, setLoadCustomers] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(0);

  const [assunto, setAssunto] = useState('Emagrecimento');
  const [status, setStatus] = useState('Ativo');
  const [treino, setTreino] = useState('ab');
  const [complemento, setComplemento] = useState('');
  const [desempenho,  setDesempenho] = useState('0');
  const [disciplina,  setDisciplina] = useState('1');
 

  const [idCustomer, setIdCustomer] = useState(false);

  const { user } = useContext(AuthContext);



  useEffect(()=> {
    async function loadCustomers(){
      await firebase.firestore().collection('customers')
      .get()
      .then((snapshot)=>{
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nomeFantasia: doc.data().nomeFantasia
          })
        })

        if(lista.length === 0){
          console.log('NENHUMA EMPRESA ENCONTRADA');
          setCustomers([ { id: '1', nomeFantasia: 'FREELA' } ]);
          setLoadCustomers(false);
          return;
        }

        setCustomers(lista);
        setLoadCustomers(false);

        if(id){
          loadId(lista);
        }

      })
      .catch((error)=>{
        console.log('DEU ALGUM ERRO!', error);
        setLoadCustomers(false);
        setCustomers([ { id: '1', nomeFantasia: '' } ]);
      })

    }

    loadCustomers();

  }, [id]);



  async function loadId(lista){
    await firebase.firestore().collection('chamados').doc(id)
    .get()
    .then((snapshot) => {
      setAssunto(snapshot.data().assunto);
      setDisciplina(snapshot.data().disciplina);
      setDesempenho(snapshot.data().desempenho)
      setStatus(snapshot.data().status);
      setTreino(snapshot.data().treino);
      setComplemento(snapshot.data().complemento)

      let index = lista.findIndex(item => item.id === snapshot.data().clienteId );
      setCustomerSelected(index);
      setIdCustomer(true);

    })
    .catch((err)=>{
      console.log('ERRO NO ID PASSADO: ', err);
      setIdCustomer(false);
    })
  }

  async function handleRegister(e){
    e.preventDefault();

    if(idCustomer){
      await firebase.firestore().collection('chamados')
      .doc(id)
      .update({
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        status: status,
        disciplina: disciplina,
        desempenho:desempenho,
        pontuacao: disciplina*desempenho,
        treino: treino,
        complemento: complemento,
        userId: user.uid
      })
      .then(()=>{
        toast.success('Chamado Editado com sucesso!');
        setCustomerSelected(0);
        setComplemento('');
        history.push('/dashboard');
      })
      .catch((err)=>{
        toast.error('Ops erro ao registrar, tente mais tarde.')
        console.log(err);
      })

      return;
    }

    await firebase.firestore().collection('chamados')
    .add({
      created: new Date(),
      cliente: customers[customerSelected].nomeFantasia,
      clienteId: customers[customerSelected].id,
      assunto: assunto,
      status: status,
      treino: treino,
      disciplina: disciplina,
      desempenho: desempenho,
      pontuacao: disciplina*desempenho,
      complemento: complemento,
      userId: user.uid
    })
    .then(()=> {
      toast.success('Chamado criado com sucesso!');
      setComplemento('');
      setCustomerSelected(0);
    })
    .catch((err)=> {
      toast.error('Ops erro ao registrar, tente mais tarde.')
      console.log(err);
    })


  }


  //Chamado quando troca o assunto
  function handleChangeSelect(e){
    setAssunto(e.target.value);
  }

  function handleChangeSelectdisciplina(e){
    setDisciplina(e.target.value);
  }

  //Chamado quando troca o status
  function handleOptionChange(e){
    setStatus(e.target.value);
  }

  function handleOptionChangeCheck(e){
    setTreino(e.target.value);
  }

  //Chamado quando troca de cliente
  function handleChangeCustomers(e){
    //console.log('INDEX DO CLIENTE SELECIONADO: ', e.target.value);
    //console.log('Cliente selecionado ', customers[e.target.value])
    setCustomerSelected(e.target.value);
  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Nova Ficha">
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
        <div className="colum">
          <form className="form-profile"  onSubmit={handleRegister} >
           
            <label>Alunos</label>

            {loadCustomers ? (
              <input type="text" disabled={true} value="Carregando clientes..." />
            ) : (
                <select value={customerSelected} onChange={handleChangeCustomers} >
                {customers.map((item, index) => {
                  return(
                    <option key={item.id} value={index} >
                      {item.nomeFantasia}
                    </option>
                  )
                })}
              </select>
            )}

           
            <label>Objetivo</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Emagrecimento">Emagrecimento</option>
              <option value="Hipertrofia">Hipertrofia</option>
              <option value="Definição">Definição</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input 
              type="radio"
              name="radio"
              value="Ativo"
              onChange={handleOptionChange}
              checked={ status === 'Ativo' }
              />
              <span>Ativo</span>

              <input 
              type="radio"
              name="radio"
              value="Progresso"
              onChange={handleOptionChange}
              checked={ status === 'Progresso' }
              />
              <span>Progresso</span>

              <input 
              type="radio"
              name="radio"
              value="Inativo"
              onChange={handleOptionChange}
              checked={ status === 'Inativo' }
              />
              <span>Inativo</span>
            </div>

            <label>Modalidade Treino</label>
            <div className="status">
              <input 
              type="checkbox"
              name="checkbox"
              value="AB"
              onChange={handleOptionChangeCheck}
              checked={ treino === 'AB' }
              />
              <span>AB</span>

              <input 
              type="checkbox"
              name="checkbox"
              value="ABC"
              onChange={handleOptionChangeCheck}
              checked={ treino === 'ABC' }
              />
              <span>ABC</span>

              <input 
              type="checkbox"
              name="checkbox"
              value="ABCD"
              onChange={handleOptionChangeCheck}
              checked={ treino === 'ABCD' }
              />
              <span>ABCD</span>
              <input 
              type="checkbox"
              name="checkbox"
              value='ABCDEF'
              onChange={handleOptionChangeCheck}
              checked={ treino === 'ABCDEF' }
              />
              <span>ABCDEF</span>
            </div>




            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva informações adicionais (opcional)."
              value={complemento}
              onChange={ (e) => setComplemento(e.target.value) }
            />
            
            <button type="submit">Registrar</button>
            
          </form>
          </div>
          <div className="colum">
          <div className="content">
          <div className="container">
          <form className="form-profile"  onSubmit={handleRegister} >
            <label>Nível Desempenho</label>
          <input 
          type="number"
          name="number"
          value={desempenho}
          max="10"         
          min="0"
          disabled={user.categoria !== "Instrutor"}
          onChange={(e) => setDesempenho(e.target.value)}
          i/>

      

            <label>Disciplina Diária</label>
            <select value={disciplina} onChange={handleChangeSelectdisciplina} disabled={user.categoria !== "Instrutor"}>
              <option value="1">1 dia frequentado</option>
              <option value="2">3 dias</option>
              <option value="3">todos dias</option>
            </select>
            
            </form>
          </div>
          </div>
          </div>
        </div>

      </div>
    </div>
  )
}