import React from 'react'

import mock from '../../assets/marca_ufc.png'

import './AboutArea.css'

const AboutArea = () => {
  return (
    <div className='about-bg'>
        <div className='about-info'>
            <img className='img-radio' src={mock} alt="Imagem da Rádio" />
            <p className='about-text'>Texto padrão da página Sobre.</p>
        </div>
    </div>
  )
}

export default AboutArea