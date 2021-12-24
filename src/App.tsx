import React, { useState, useEffect } from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import BannerSlider from './assets/banner.svg';
import StarFill from './assets/icon-star-fill.svg';
import StarEmpty from './assets/icon-star-empty.svg';
import { masks, validation } from './utils';

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
  const [errorName, setErrorName] = useState(false);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [amountItemsCart, setAmountItemsCart] = useState(0);
  const [registerEmailScreen, setRegisterEmailScreen] = useState(false);

  useEffect(() => {
    const amount = localStorage.getItem("amountItemsCart");
    amount && setAmountItemsCart(+amount);
  }, []);

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

  const ratingStars = (numberOfStars: number) => {
    const starArray: boolean[] = []
    for(let i = 0; i<5; i++) {
      starArray.push(i < numberOfStars ? true : false)
    }
    return starArray.map((wellRated, id) => {
      return <img src={wellRated ? StarFill : StarEmpty} className={styles.star} key={id} />
    });
  }

  async function registerEmail(e: any) {
    e.preventDefault();
    nameValidation();
    emailValidation();
    if(name && email && !errorName && !errorEmail) {
      //chamar Api
      setRegisterEmailScreen(false);
    }
  }

  function nameValidation() {
    try {
      const validate = validation.name(name);
      if(validate) {
        setErrorName(false);
      } else {
        setErrorName(true);
      }
    } catch(e) {
      setErrorName(true);
    }
  }

  async function emailValidation() {
    try {
      const validate = validation.email(email);
      if(validate) {
        setErrorEmail(false);
      } else {
        setErrorEmail(true);
      }
    } catch (e) {
        setErrorEmail(true);
    }
  }

  function registerNewEmailScreen() {
    setName('');
    setEmail('');
    setRegisterEmailScreen(true)
  }

  return (
    <div>
      <Header amountItems={amountItemsCart} />

      <img src={BannerSlider} />

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
                    <p className={styles.off}>OFF</p>
                  </>}
                  <img src={product.imageUrl} alt={product.productName} className={styles.productImage}/>
                </div>
                <p className={styles.productName}>
                  {product.productName}
                </p>
                <div>
                  {ratingStars(product.stars)}
                </div>
                <p className={`${styles.listPrice} ${!product.listPrice && styles.hide}`}>
                  de {product.listPrice && masks.currencyFormatter(product.listPrice)}
                </p>
                <p className={styles.price}>
                  por {masks.currencyFormatter(product.price)}
                </p>
                <p className={`${styles.installments} ${!product.installments.length && styles.hide}`}>
                  ou em {product.installments[0]?.quantity}x de
                  {product.installments[0] && masks.currencyFormatter(product.installments[0].value)}
                </p>
                <button className={styles.buttonBuy} onClick={() => setAmountItemsCart(amountItemsCart + 1)}>
                  COMPRAR
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {registerEmailScreen ?
        <form className={styles.contentRegister} onSubmit={(e) => registerEmail(e)}>
          <h1 className={styles.titleRegister}>Participe de nossas news com promoções e novidades!</h1>

          <div className={styles.inputs}>
            <input
              type='text'
              placeholder='Digite seu nome'
              className={`${styles.input} ${errorName && styles.inputError}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={nameValidation}
            />
            {errorName &&
              <p className={styles.error}>
                Preencha seu nome completo
              </p>
            }
            <input
              type='text'
              placeholder='Digite seu e-mail'
              className={`${styles.input} ${styles.inputEmail} ${errorEmail && styles.inputError}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={emailValidation}
            />
            {errorEmail &&
              <p className={styles.error}>
                Preencha com um e-mail válido
              </p>
            }
          </div>

          <button
            className={`${styles.buttonRegister} ${(errorName || errorEmail) && styles.buttonDisabled}`}
            type='submit'
            disabled={errorName || errorEmail}
          >
            <span className={styles.contactText}>Eu quero!</span>
          </button>
        </form> :
        <div className={styles.contentRegister}>
          <h2 className={styles.titleRegisterSuccess}>Seu e-mail foi cadastrado com sucesso!</h2>
          <p className={styles.textRegisterSuccess}>A partir de agora você receberá as novidades e ofertas exclusivas.</p>
          <button className={styles.buttonRegister} onClick={() => registerNewEmailScreen()}>
            <span className={styles.contactText}>Cadastrar novo e-mail!</span>
          </button>
        </div>
      }      
      <Footer />
    </div>
  )
}

export default App;
