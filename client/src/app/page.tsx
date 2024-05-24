// import Image from "next/image";
// import '../app/globals.css';
import Navbar from './components/header';
import Hero from './components/hero';
import AboutUs from './components/aboutUs';
import OrganizeWork from './components/organizeWork';
import Tools from './components/tools';
import Tips from './components/tips';
import Footer from './components/footer';
import type { AppProps } from 'next/app';

const Home = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Navbar />
      <Hero {...pageProps}  />
      <OrganizeWork  {...pageProps} />
      <Tools {...pageProps}  />
      <Tips />
      
      <AboutUs />
      <Footer />
    </>
  );
};

export default Home;