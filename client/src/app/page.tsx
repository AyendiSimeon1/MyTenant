
import Navbar from './components/header';
import Hero from './components/hero';
import AboutUs from './components/aboutUs';
import OrganizeWork from './components/organizeWork';
import Tools from './components/tools';
import Tips from './components/tips';
import Footer from './components/footer';
import type { AppProps } from 'next/app';
import { UserProvider } from '../userContext';
import 'tailwindcss/tailwind.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <OrganizeWork />
      <Tools />
      <Tips />
      <AboutUs />
      <Footer />
    </>
  );
};

export default Home;