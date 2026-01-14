import React from 'react'

import mock from '../../assets/marca_ufc.png'

import './AboutArea.css'

const AboutArea = () => {
  return (
    <div className='about-bg'>
        <div className='about-info'>
            <img className='img-radio' src={mock} alt="Imagem da Rádio" />
            <p className='about-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dolores adipisci perferendis explicabo, exercitationem voluptatum nulla, corrupti placeat reiciendis sit ab id neque labore mollitia porro magni praesentium ex voluptatibus.</p>
        </div>
    </div>
  )
}

export default AboutArea