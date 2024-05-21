import Image from "next/image";
import Navbar from './components/header';
import Hero from './components/hero';
import AboutUs from './components/aboutUs';
import OrganizeWork from './components/organizeWork';
import Tools from './components/tools';
import Tips from './components/tips';
import Footer from './components/footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Tools />
      <Tips />
      <OrganizeWork />
      <AboutUs />
      <Footer />
    </>
  );
};

export default Home;