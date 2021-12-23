import React, { useState } from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import BannerSlider from './assets/banner.svg';
import StarFill from './assets/icon-star-fill.svg';
import StarEmpty from './assets/icon-star-empty.svg';

import styles from './App.module.css';

interface Product {
  productId: number,
  productName: string,
  stars: number,
  imageUrl: string,
  listPrice: number | null,
  price: number,
  installments: [
    {
      quantity: number,
      value: number
    }
  ] | []
}

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amountItemsCart, setAmountItemsCart] = useState(0);


  const mockProducts: Product[] = [
    {
      "productId": 1,
      "productName": "SAPATO FLOATER PRETO",
      "stars": 1,
      "imageUrl": "https://corebiz-test.herokuapp.com/images/product-1.png",
      "listPrice": null,
      "price": 25990,
      "installments": [
        {
          "quantity": 9,
          "value": 2887
        }
      ]
    },
    {
      "productId": 2,
      "productName": "SANDÁLIA LINHO BROWN",
      "stars": 4,
      "imageUrl": "https://corebiz-test.herokuapp.com/images/product-2.png",
      "listPrice": 29900,
      "price": 19900,
      "installments": [
        {
          "quantity": 4,
          "value": 4975
        }
      ]
    },
    {
      "productId": 3,
      "productName": "BOTA MUSTANG PRETO",
      "stars": 2,
      "imageUrl": "https://corebiz-test.herokuapp.com/images/product-3.png",
      "listPrice": 32900,
      "price": 29900,
      "installments": [
        {
          "quantity": 10,
          "value": 2990
        }
      ]
    },
    {
      "productId": 4,
      "productName": "CINTO SEMICROMO PRETO 40MM",
      "stars": 3,
      "imageUrl": "https://corebiz-test.herokuapp.com/images/product-4.png",
      "listPrice": null,
      "price": 7990,
      "installments": []
    }
  ]

  function currencyFormatter(value: number) {
    const format = /^([\d]*)\.?([\d]{2})/;
    const separatedByCents = String(value).replace(format,"$1.$2");

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(separatedByCents));
  }

  const ratingStars = (numberOfStars: number) => {
    const starArray: boolean[] = []
    for(let i = 0; i<5; i++) {
      starArray.push(i < numberOfStars ? true : false)
    }
    return starArray.map((wellRated, id) => {
      return <img src={wellRated ? StarFill : StarEmpty} className={styles.star} key={id} />
    });
  }

  return (
    <div>
      <Header amountItems={amountItemsCart} />

      <div>
        <img src={BannerSlider} />
      </div>

      <div className={styles.showCase}>
        <div className={styles.titleShowCase}>
          Mais Vendidos
          <div className={styles.bar}></div>
        </div>
        <div className={styles.cardsGroups}>
          {mockProducts.map(product => {
            return (
              <div className={styles.card} key={product.productId}>
                <div style={{position: 'relative', width: '132px'}}>
                  {product.listPrice && <>
                    <div className={styles.backgroundOff}></div>
                    <div className={styles.off}>OFF</div>
                  </>}
                  <img src={product.imageUrl} alt={product.productName} className={styles.productImage}/>
                </div>
                <div className={styles.productName}>
                  {product.productName}
                </div>
                <div>
                  {ratingStars(product.stars)}
                </div>
                <div className={`${styles.listPrice} ${!product.listPrice && styles.hide}`}>
                  de {product.listPrice && currencyFormatter(product.listPrice)}
                </div>
                <div className={styles.price}>
                  por {currencyFormatter(product.price)}
                </div>
                <div className={`${styles.installments} ${!product.installments.length && styles.hide}`}>
                  ou em {product.installments[0]?.quantity}x de
                  {product.installments[0] && currencyFormatter(product.installments[0].value)}
                </div>
                <button className={styles.buttonBuy} onClick={() => setAmountItemsCart(amountItemsCart + 1)}>
                  COMPRAR
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.contentRegister}>
        <h1 className={styles.titleRegister}>Participe de nossas news com promoções e novidades!</h1>

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
          <button className={styles.buttonRegister}>
            <span className={styles.contactText}>Eu quero!</span>
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default App;
