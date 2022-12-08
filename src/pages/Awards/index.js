
import './awards.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import Card from '../../components/Card';



import { FiGift  } from 'react-icons/fi';

export default function Awards(){
  const cine = "O KIT CINEMA conta com um mês grátis de Netflix e um balde com aperitivos para passar com alguém importante!";
  const rod = "O KIT RODIZIO conta com um rodízio liberado em qualquer restaurante de comida japonesa da cidade!";
  const sup = 'O KIT SUPLEMENTOS conta com uma variedade de suplementos para garantir seu melhor desempenho nas atividade físicas!'

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Prêmios">
        <FiGift color="#ff0043" size={27} />
        </Title>
        <div className='colum'> 
        <Card title="KIT CINEMA" imageurl="https://t2.tudocdn.net/521701?w=1920" body={cine} star={1}/>
        <Card title="KIT RODIZIO" imageurl="https://www.djapa.com.br/wp-content/uploads/2019/12/comida-japonesa.jpg" body={rod} star={3}/>
        <Card title="KIT SUPLEMENTOS" imageurl="https://cf.shopee.com.br/file/4a59ff8b67ed1651d14f158c2135d88a" body={sup} star={2}/>
        </div>
      </div>
    </div>
  )
}