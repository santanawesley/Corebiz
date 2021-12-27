import React, { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";

import { showToast } from '../../utils';
import iconMenu from '../../assets/icon-menu.svg';
import iconUser from '../../assets/icon-user.svg';
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

  const pageWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  useEffect(() => {
    const amount = localStorage.getItem("amountItemsCart");
    amount && setAmountItemsCart(+amount);
  }, []);

  useEffect(() => {
    if(amountItems !== amountItemsCart) {
      localStorage.setItem("amountItemsCart", amountItems.toString());
      setAmountItemsCart(amountItems);
      showToast("success", "Item adicionado ao carrinho de compras com sucesso!");
    }
  }, [amountItems]);

  return (
    <div className={styles.contentHeader}>
      <div className={styles.lineCart}>
        {pageWidth < 321 && <img src={iconMenu} alt='Abrir menu' />}
        <img src={logo} alt='Corebiz' />
        {pageWidth > 768 && <>
            <div className={styles.search}>
              <input
                type='text'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder='O que você está procurando?'
                className={styles.inputSearch}
              >
              </input>
              <img src={magnifyingGlass} alt='Pesquisar' />
            </div>
            <div>
            </div>
          </>
        }
        <div className={styles.blockCart}>
          {pageWidth > 768 &&
            <div className={styles.myCount}>
              <img src={iconUser} alt='Acessar minha conta' />
              <p>Minha Conta</p>
            </div>
          }
          <img src={shoppingCart} alt='Carrinho de compras' />
          <span className={styles.checkCounter}>
            {amountItemsCart}
          </span>
        </div>
      </div>

      {pageWidth < 321 && <div className={styles.search}>
          <input
            type='text'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder='O que você está procurando?'
            className={styles.inputSearch}
          >
          </input>
            <img src={magnifyingGlass} alt='Pesquisar' />
        </div>
      }
    </div>
  );
}
