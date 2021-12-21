import React, { useState } from 'react';

import iconMenu from '../../assets/icon-menu.svg';
import logo from '../../assets/logo-corebiz-preto-cinza.svg';
import shoppingCart from '../../assets/shopping-cart.svg';
import magnifyingGlass from '../../assets/magnifying-glass.svg';
import styles from './styles.module.css';

export const Header = () => {
  const [amountItemsCart, setAmountItemsCart] = useState(1);
  const [searchText, setSearchText] = useState('');

  return (
    <div className={styles.contentHeader}>
      <div className={styles.lineCart}>
        <img src={iconMenu} alt='Abrir menu' />
        <img src={logo} alt='Corebiz' />
        <div className={styles.blockCart}>
          <img src={shoppingCart} alt='Carrinho de compras' />
          <span className={styles.checkCounter}>
            {amountItemsCart}
          </span>
        </div>
      </div>

      <div className={styles.search}>
        <input
          type='text'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder='O que está procurando?'
          className={styles.inputSearch}
        >
        </input>
          <img src={magnifyingGlass} alt='Pesquisar' />
      </div>
    </div>
  );
}
