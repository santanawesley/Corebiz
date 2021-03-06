import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import BannerSmall from './assets/banner.svg';
import Banner from './assets/banner-desk.svg';
import StarFill from './assets/icon-star-fill.svg';
import StarEmpty from './assets/icon-star-empty.svg';
import ArrowLeft from './assets/left-arrow.svg';
import ArrowRight from './assets/right-arrow.svg';
import { masks, validation } from './utils';
import api from './services/api';
import { showToast } from './utils';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

interface RegistrationAnswer {
  "message": string
}

function App() {
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [amountItemsCart, setAmountItemsCart] = useState(0);
  const [registerEmailScreen, setRegisterEmailScreen] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);

  useEffect(() => {
    (async function getProductsList() {
      setLoadingProduct(true);

      try{
        const response = await api.get<Product[]>('/api/v1/products');
        if(response.data) {
          setListProducts(response.data);
        } else {
          showToast("error", "Ocorreu um erro na busca da listagem de produtos. Favor tentar novamente mais tarde!");
        }
      } catch(e){
        showToast("error", "Ocorreu um erro na busca da listagem de produtos. Favor tentar novamente mais tarde!");
      } finally {
        setLoadingProduct(false);
      }
    })();
  }, []);

  useEffect(() => {
    const amount = localStorage.getItem("amountItemsCart");
    amount && setAmountItemsCart(+amount);
  }, []);

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
      setLoadingButton(true);
      try {
        const response = await api.post<RegistrationAnswer>('/api/v1/newsletter', {
          "email": email,
          "name": name
        });
        if(response.data) {
          setRegisterEmailScreen(false);
        } else {
          showToast("error", "Ocorreu um erro no cadastro do e-mail. Favor tentar novamente mais tarde!");
        }
      } catch(e){
          showToast("error", "Ocorreu um erro no cadastro do e-mail. Favor tentar novamente mais tarde!");
      } finally {
        setLoadingButton(false);
      }
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

  
  const pageWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  const slider = useRef<any>(null);

  const settings = {
    dots: pageWidth > 768 ? false : true,
    arrows: false,
    infinite: true,
    swipe: true,
    swipeToSlide: true,
    slidesToShow: pageWidth > 800 ? 4 : pageWidth > 499 ? 3 : 2,
    slidesToScroll: 1,
    lazyload: 'ondemand', 
    autoplay: true,
  };

  return (
    <div>
      <Header amountItems={amountItemsCart} />

      <img src={ pageWidth > 768 ? Banner : BannerSmall} className={styles.banner} />

      <div className={styles.showCase}>
        <div className={styles.titleShowCase}>
          Mais Vendidos
          <div className={styles.bar}></div>
        </div>
        <div className={styles.slider}>
          { pageWidth > 768 && <img onClick={() => slider?.current?.slickPrev()} src={ArrowLeft} className={styles.arrowLeft}/>}
          {loadingProduct ?
            <div className={styles.loaderLarger} /> :
            <Slider  ref={slider} {...settings}>
              {listProducts.map(product => {
                return (
                  <div className={styles.wrappingCard} key={product.productId}>
                    <div className={styles.card}>
                      <div className={styles.offBlock}>
                        {product.listPrice && <div className={pageWidth > 768 ? '' : styles.advertOff}>
                          <div className={styles.backgroundOff}></div>
                          <p className={styles.off}>OFF</p>
                        </div>}
                        <img src={product.imageUrl} alt={product.productName} className={styles.productImage}/>
                      </div>
                      <p className={styles.productName}>
                        {product.productName}
                      </p>
                      <div className={styles.stars}>
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
                  </div>  
                )
              })}
            </Slider>
          }
          { pageWidth > 768 && <img onClick={() => slider?.current.slickNext()} src={ArrowRight} className={styles.arrowRight}/>}
        </div>
      </div>

      {registerEmailScreen ?
        <form className={styles.contentRegister} onSubmit={(e) => registerEmail(e)}>
          <h1 className={styles.titleRegister}>Participe de nossas news com promo????es e novidades!</h1>
          <div className={styles.bodyRegister}>
            <div className={styles.inputs}>
              <div className={styles.inputName}>
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
              </div>
              <div className={styles.inputEmail}>
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
                    Preencha com um e-mail v??lido
                  </p>
                }
              </div>
            </div>

            <button
              className={`${styles.buttonRegister} ${(errorName || errorEmail) && styles.buttonDisabled}`}
              type='submit'
              disabled={errorName || errorEmail}
            >
              {loadingButton ? (
                <div className={styles.loaderSmall} />
              ) : (
                <span className={styles.contactText}>Eu quero!</span>
              )}
            </button>
          </div>
        </form> :
        <div className={styles.contentRegister}>
          <h2 className={styles.titleRegisterSuccess}>Seu e-mail foi cadastrado com sucesso!</h2>
          <p className={styles.textRegisterSuccess}>A partir de agora voc?? receber?? as novidades e ofertas exclusivas.</p>
          <button className={`${styles.buttonRegister} ${styles.buttonNewRegister}`} onClick={() => registerNewEmailScreen()}>
            <span className={styles.contactText}>Cadastrar novo e-mail!</span>
          </button>
        </div>
      }      
      <Footer />
    </div>
  )
}

export default App;
