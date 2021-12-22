import { Header } from './components/Header';
import { Banner } from './components/Banner';
import { RegisterNews } from './components/RegisterNews';
import { Footer } from './components/Footer';
import styles from './App.module.css';

function App() {
  return (
    <div>
      <Header />
      <Banner />
      <RegisterNews />
      <Footer />
    </div>
  )
}

export default App;
