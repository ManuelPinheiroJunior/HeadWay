
import { useContext } from 'react';
import './header.css';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png';

import { Link } from 'react-router-dom';
import { FiList, FiUser, FiUserPlus, FiLogOut,FiBarChart,FiAward,FiNavigation } from "react-icons/fi";

export default function Header(){
  const { user, signOut} = useContext(AuthContext);
  

  return(
    <div className="sidebar">
      <div>
        <img src={user.avatarUrl === null ? avatar : user.avatarUrl } alt="Foto avatar" />
      </div>

      <Link to="/feed">
        <FiBarChart color="#FFF" size={24} />
        Ranking
      </Link> 
      <Link to="/informative">
        <FiNavigation color="#FFF" size={24} />
        Notícias
      </Link>
      <Link to="/dashboard">
        <FiList color="#FFF" size={24} />
        FICHAS
      </Link>
      {user?.categoria === "Instrutor" && (
      <Link to="/customers">
        <FiUserPlus color="#FFF" size={24} />
        Aluno
      </Link>   
      )} 
        <Link to="/awards">
        <FiAward color="#FFF" size={24} />
        Prêmios Mensais
      </Link> 


      <Link to="/profile">
        <FiUser color="#FFF" size={24} />
       Perfil
      </Link>   
        
      <Link onClick={ () => signOut()} >
        <FiLogOut color="#FFF" size={24} />
        Sair
      </Link>    
             

    </div>
  )
}