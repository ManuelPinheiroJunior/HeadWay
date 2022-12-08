
import './feed.css';
import { useState, useEffect } from 'react';
import Title from '../../components/Title';
import Header from '../../components/Header';
import firebase from '../../services/firebaseConnection';
import {FiList,  FiBarChart, FiStar,FiGift } from 'react-icons/fi';
import Modal from '../../components/Modal';

const listRef = firebase.firestore().collection('chamados').orderBy('pontuacao','desc');


export default function Feed(){

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
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          status: doc.data().status,
          complemento: doc.data().complemento,
          pontuacao: doc.data().pontuacao,
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
        <Title name="Ranking">
          <FiBarChart size={25} />
        </Title>
            <table>
              <thead>
                <tr>
                  <th scope="col">Aluno</th>
                  <th scope="col">OBJETIVO</th>
                  <th scope="col">Treino</th>
                  <th scope="col">Status</th>
                  <th scope="col">Pontuação</th>
                  <th scope="col"><FiGift color="#ff0043" size={27} /></th>
                </tr>
              </thead>
              <tbody>
                {chamados.map((item, index)=>{
                  return(
                    <tr key={index}>
                      <td data-label="Aluno">{item.cliente}</td>
                      <td data-label="Assunto">{item.assunto}</td>
                      <td data-label="TREINO">{item.treino}</td>
                      <td data-label="Status">
                        <span className="badge" style={{ backgroundColor: item.status === 'Ativo' ? '#5cb85c' : '#999' }}>{item.status}</span>
                      </td>
                      <td data-label="TREINO">{item?.pontuacao}  </td>
                      <td><span className="society"> {chamados[0]?.desempenho === item.desempenho && ( <>  <FiStar  color="ffff00" size={27} /> <FiStar  color="ffff00" size={27} /> <FiStar  color="ffff00" size={27} /> </>)} {chamados[1]?.desempenho === item.desempenho && ( <>  <FiStar  color="ffff00" size={27} /> <FiStar  color="ffff00" size={27} />  </>)} {chamados[2]?.desempenho === item.desempenho && ( <> <FiStar  color="ffff00" size={27} /> </>)}  </span>  
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            
            {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15 }}>Buscando Alunos...</h3>}
            {!loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar mais alunos</button> }
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