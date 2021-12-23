import React, { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";

import { ShowToast } from '../../utils';
import iconMenu from '../../assets/icon-menu.svg';
import logo from '../../assets/logo-corebiz-preto-cinza.svg';
import shoppingCart from '../../assets/shopping-cart.svg';
import magnifyingGlass from '../../assets/magnifying-glass.svg';
import styles from './styles.module.css';

interface IProps {
  amountItems: number;
}

export const Header = ({amountItems}: IProps) => {
  const [amountItemsCart, setAmountItemsCart] = useState(0);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const amount = localStorage.getItem("amountItemsCart");
    amount && setAmountItemsCart(+amount);
  }, []);

  useEffect(() => {
    if(amountItems !== amountItemsCart) {
      localStorage.setItem("amountItemsCart", amountItems.toString());
      setAmountItemsCart(amountItems);
      ShowToast("success", "Item adicionado ao carrinho de compras com sucesso!");
    }
  }, [amountItems]);

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
