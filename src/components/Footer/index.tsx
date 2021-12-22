import React from 'react';

import LogoCorebiz from '../../assets/logo-corebiz-branco-cinza.svg';
import LogoVtex from '../../assets/logo-vtex.svg';
import iconEnvelope from '../../assets/icon-envelope.svg';
import iconHeadset from '../../assets/icon-headset.svg';

import styles from './styles.module.css';

export const Footer = () => {
  return (
    <div className={styles.contentFooter}>
      <h1 className={styles.title}>Localização</h1>
      <div className={styles.bar}></div>

      <div className={styles.address}>
        Avenida Andrômeda, 2000. Bloco 6 e 8 <br />
        Alphavile SP  <br />
        brasil@corebiz.ag  <br />
        +55 11 3090 1039
      </div>

      <div>
        <button className={styles.button}>
          <img src={iconEnvelope} alt='Entre em contato' className={styles.icon} />
          <span className={styles.contactText}>ENTRE EM CONTATO</span>
        </button>
        <button className={styles.button}>
          <img src={iconHeadset} alt='Fale com nosso consultor online' className={styles.icon} />
          <span className={styles.contactText}>FALE COM O NOSSO CONSULTOR ONLINE</span>
        </button>
      </div>

      <div className={styles.credits}>
        <div className={styles.creditsInfo}>
          Created by<br/>
          <img src={LogoCorebiz} alt='Corebiz' />
        </div>
        <div className={styles.creditsInfo}>
          Powered by<br/>
          <img src={LogoVtex} alt='VTex' />
        </div>
      </div>
    </div>
  );
}
