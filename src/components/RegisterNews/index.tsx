import React, { useState } from 'react';

import LogoCorebiz from '../../assets/logo-corebiz-branco-cinza.svg';
import LogoVtex from '../../assets/logo-vtex.svg';
import iconEnvelope from '../../assets/icon-envelope.svg';
import iconHeadset from '../../assets/icon-headset.svg';

import styles from './styles.module.css';

export const RegisterNews = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className={styles.contentRegister}>
      <h1 className={styles.title}>Participe de nossas news com promoções e novidades!</h1>

      <div className={styles.inputs}>
        <input
          type='text'
          placeholder='Digite seu nome'
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Digite seu email'
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <button className={styles.button}>
          <span className={styles.contactText}>Eu quero!</span>
        </button>
      </div>
    </div>
  );
}
