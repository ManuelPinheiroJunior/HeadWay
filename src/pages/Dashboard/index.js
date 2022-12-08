
import './dashboard.css';
import { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiList, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import firebase from '../../services/firebaseConnection';
import Modal from '../../components/Modal';

const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');

export default function Dashboard(){
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();

  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(()=> {

    async function loadChamados(){
      await listRef.limit(5)
      .get()
      .then((snapshot) => {
        updateState(snapshot)
      })
      .catch((err)=>{
        console.log('Deu algum erro: ', err);
        setLoadingMore(false);
      })
  
      setLoading(false);
  
    }

    loadChamados();

    return () => {

    }
  }, []);



  async function updateState(snapshot){
    const isCollectionEmpty = snapshot.size === 0;

    if(!isCollectionEmpty){
      let lista = [];

      snapshot.forEach((doc)=>{
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          treino: doc.data().treino,
          desempenho: doc.data().desempenho,
          disciplina: doc.data().disciplina,
          pontuacao: doc.data().desempenho* doc.data().disciplina,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          complemento: doc.data().complemento
        })
      })

      const lastDoc = snapshot.docs[snapshot.docs.length -1]; //Pegando o ultimo documento buscado
      
      setChamados(chamados => [...chamados, ...lista]);
      setLastDocs(lastDoc);

    }else{
      setIsEmpty(true);
    }

    setLoadingMore(false);

  }


  async function handleMore(){
    setLoadingMore(true);
    await listRef.startAfter(lastDocs).limit(5)
    .get()
    .then((snapshot)=>{
      updateState(snapshot)
    })
  }


  function togglePostModal(item){
    setShowPostModal(!showPostModal) //trocando de true pra false
    setDetail(item);
  }
 

  if(loading){
    return(
      <div>
        <Header/>

        <div className="content">
          <Title name="Fichas">
            <FiList size={25} />
          </Title>  

          <div className="container dashboard">
            <span>Buscando chamados...</span>
          </div>

        </div>      
      </div>
    )
  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Fichas">
          <FiList size={25} />
        </Title>

        {chamados.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado registrado...</span>

            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
                Cadastro de Ficha
            </Link>
          </div>
        )  : (
          <>
            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
             Cadastro de Ficha
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Aluno</th>
                  <th scope="col">Objetivo</th>
                  <th scope="col">Treino</th>
                  <th scope="col">Status</th>
                  <th scope="col">Data de Registro</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {chamados.map((item, index)=>{
                  return(
                    <tr key={index}>
                      <td data-label="Aluno">{item.cliente}</td>
                      <td data-label="Objetivo">{item.assunto}</td>
                      <td data-label="TREINO">{item.treino}</td>
                      <td data-label="Status">
                        <span className="badge" style={{ backgroundColor: item.status === 'Ativo' ? '#5cb85c' : '#999' }}>{item.status}</span>
                      </td>
                      <td data-label="Cadastrado">{item.createdFormated}</td>
                      <td data-label="#">
                        <button className="action" style={{backgroundColor: '#3583f6' }} onClick={ () => togglePostModal(item) }>
                          <FiSearch color="#FFF" size={17} />
                        </button>
                        <Link className="action" style={{backgroundColor: '#F6a935' }} to={`/new/${item.id}`} >
                          <FiEdit2 color="#FFF" size={17} />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            
            {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15 }}>Buscando mais alunos...</h3>}
            { !loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar mais alunos</button> }

          </>
        )}

      </div>

      {showPostModal && (
        <Modal
          conteudo={detail}
          close={togglePostModal}
        />
      )}

    </div>
  )
}