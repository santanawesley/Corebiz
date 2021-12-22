import React, { useState } from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import BannerSlider from './assets/banner.svg';

import styles from './App.module.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div>
      <Header />

      <div>
        <img src={BannerSlider} />
      </div>

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
      
      <Footer />
    </div>
  )
}

export default App;
