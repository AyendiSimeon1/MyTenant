import "./globals.css";
import "tailwindcss/tailwind.css";
import PropertyCard from './components/landingPage/PropertyCard';
import TrendingPropertyList from './components/landingPage/TrendingProperty';
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
      <OrganizeWork />
      <PropertyCard />
      <TrendingPropertyList />
      <Tips />
      <AboutUs />
      <Footer />
    </>
  );
};

export default Home;