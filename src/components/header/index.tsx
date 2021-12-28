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
        {pageWidth < 321 && <img src={iconMenu} alt='Abrir menu' onClick={() => console.log('Abrir Menu')}/>}
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
              <img src={magnifyingGlass} alt='Pesquisar' className={styles.imgSearch} onClick={() => console.log('Realizar a busca')}/>
            </div>
            <div>
            </div>
          </>
        }
        <div className={styles.blockCart}>
          {pageWidth > 768 &&
            <div className={styles.myCount} onClick={() => console.log('Direcionar para Login')}>
              <img src={iconUser} alt='Acessar minha conta' />
              <p>Minha Conta</p>
            </div>
          }
          <div className={styles.cart} onClick={() => console.log('Direcionar para Itens no carrinho de compra')}>
            <img src={shoppingCart} alt='Carrinho de compras' />
            <span className={styles.checkCounter}>
              {amountItemsCart}
            </span>
          </div>
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
