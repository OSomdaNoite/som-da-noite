import React, { useState, useEffect } from 'react'
import './Admin.css'
import PlaceholderImage from '../../assets/marca_ufc_tv.jpg'

const Admin = () => {
  const [time, setTime] = useState(new Date())
  const [isPlaying, setIsPlaying] = useState(true)

  const [radioLogo, setRadioLogo] = useState(null)
  const [colors, setColors] = useState({
    mainColor: '#0060AC',
    mainColorLight: '#4b98d6',
    secondaryColor: '#D9B82B',
    textColor: '#eee',
    mainColorDark: '#001c33'
  })
  const [contactEnabled, setContactEnabled] = useState(true)
  const [contactText, setContactText] = useState("Texto padrão da página Contato.")
  const [contactSocials, setContactSocials] = useState({
    facebook: true,
    instagram: true,
    twitter: false,
    youtube: false,
    discord: false
  })
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    discord: ''
  })
  const [aboutText, setAboutText] = useState("Texto padrão da página Sobre.")

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  const today = dayNames[time.getDay()]

  const hours = time.getHours()
  let greeting = "Olá!"
  if (hours >= 5 && hours < 12) greeting = "Bom dia!"
  else if (hours >= 12 && hours < 18) greeting = "Boa tarde!"
  else greeting = "Boa noite!"

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => setRadioLogo(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleColorChange = (e) => {
    setColors(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleContactSocialChange = (e) => {
    setContactSocials(prev => ({ ...prev, [e.target.name]: e.target.checked }))
  }

  const handleSocialLinkChange = (e) => {
    setSocialLinks(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSave = () => {
    const confirmSave = window.confirm("Tem certeza que deseja salvar as mudanças?");
    if (!confirmSave) return;
  
    console.log("Salvando configurações:", { colors, contactEnabled, contactText, contactSocials, socialLinks, aboutText });
    alert("Configurações salvas!");
  }

  const togglePlay = () => setIsPlaying(prev => !prev)

  return (
    <div className='admin-bg'>
      <div className="admin-card">

        <div className="admin-header">
          <div className="clock">{time.toLocaleTimeString()}</div>
          <div className="greeting">{greeting}</div>
          <div className="day">{today}</div>
        </div>

        <div className="track-info">
          <img src={PlaceholderImage} alt="Capa da faixa" className="track-image"/>
          <div className="track-details">
            <h2 className="track-title">Minuto UFC 243 - 09/01/2026</h2>
            <p className="track-artist">Universidade Federal do Ceará</p>
            <span className="track-status">{isPlaying ? "Tocando agora" : "Transmissão pausada"}</span>
            <button className="universal-play-pause-button" onClick={togglePlay}>
              {isPlaying ? "Pausar" : "Transmitir"}
            </button>
          </div>
        </div>

        <div className="customization-section">
          <h3>Estética e Informações</h3>
          <div className="field">
            <label>Logo da Rádio:</label>
            <input type="file" accept="image/*" onChange={handleLogoChange}/>
            {radioLogo && <img src={radioLogo} alt="Logo Rádio" className="preview-logo"/>}
          </div>

          <div className="color-grid">
            <div className="field">
              <label>Cor Principal:</label>
              <input type="color" name="mainColor" value={colors.mainColor} onChange={handleColorChange}/>
            </div>
            <div className="field">
              <label>Cor Principal Clara:</label>
              <input type="color" name="mainColorLight" value={colors.mainColorLight} onChange={handleColorChange}/>
            </div>
            <div className="field">
              <label>Cor Secundária:</label>
              <input type="color" name="secondaryColor" value={colors.secondaryColor} onChange={handleColorChange}/>
            </div>
            <div className="field">
              <label>Cor do Texto:</label>
              <input type="color" name="textColor" value={colors.textColor} onChange={handleColorChange}/>
            </div>
            <div className="field">
              <label>Cor Principal Escura:</label>
              <input type="color" name="mainColorDark" value={colors.mainColorDark} onChange={handleColorChange}/>
            </div>
          </div>

          <div className="field">
            <label>Área de Contato Ativa?</label>
            <input type="checkbox" checked={contactEnabled} onChange={() => setContactEnabled(!contactEnabled)}/>
          </div>
          {contactEnabled && (
            <>
              <div className="field">
                <label>Texto Superior da Área de Contato:</label>
                <input type="text" value={contactText} onChange={(e)=>setContactText(e.target.value)}/>
              </div>
              <div className="field">
                <label>Redes Sociais:</label>
                <div className="checkbox-group">
                  {["Facebook","Instagram","Twitter","YouTube","Discord"].map(social => (
                    <div key={social} className="social-row">
                      <label>
                        <input type="checkbox" name={social} checked={contactSocials[social]} onChange={handleContactSocialChange}/> {social}
                      </label>
                      {contactSocials[social] && (
                        <input type="text" placeholder={`Link do ${social}`} name={social} value={socialLinks[social]} onChange={handleSocialLinkChange}/>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="field">
            <label>Texto da Página Sobre:</label>
            <textarea value={aboutText} onChange={(e)=>setAboutText(e.target.value)} rows={4}></textarea>
          </div>
        </div>

        <button className="save-btn" onClick={handleSave}>Salvar</button>

        <div className="marquee-container">
          <marquee behavior="scroll" direction="left" scrollamount="6">
            O SOM DA NOITE
          </marquee>
        </div>

      </div>
    </div>
  )
}

export default Admin