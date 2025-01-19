import Head from "next/head";
import CurrencyExchangeForm from "./components/CurrencyExhangeForm";
import HeroForm from "./components/HeroForm";
import Second from "./components/Second";
import Thrid from "./components/Third";
import Footer from "./components/Footer";
import Popup from "./components/Popup";
import Photo from "./components/Photo";


export default function Home() {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <HeroForm />
      <Second />
      <Thrid />
      <Photo />
      <Popup />
      <Footer />
    </div>
  );
}
