
import './informative.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiNavigation } from "react-icons/fi";
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

import  musculacao  from '../../assets/musculacao.jpg';
import  nutricao  from '../../assets/nutricao.jpg';
import  treino  from '../../assets/treino.jpg';
import  zumba  from '../../assets/zumba.jpg'



const images = [musculacao, treino, nutricao,zumba];

export default function Informative(){

  const carousel = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    console.log(carousel.current?.scrollWidth, carousel.current?.offsetWidth)
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
    }, [])

  return(
    <div>
      <Header/>
      <div className="content">
        <Title name="Notícias Semanais">
        <FiNavigation size={24} />
        </Title>
        </div>
        <div className='block'>
        <div className='app'>
          <motion.div ref={carousel} className='carousel' whileTap={{ cursor:'grabbing'}} >
          <motion.div className='inner' drag='x' dragConstraints={{ right: 0, left: -width}} initial={{ x:100}} animate={{x:0}} transition={{duration: 0.8}}>
            {images.map(image => (
              <motion.div className='item' key={image}>
                <img src={image} alt='Texto alt'/>
                </motion.div>
            ))}
          </motion.div>
          </motion.div>
        </div>
        </div>
     
     </div>
  )
}