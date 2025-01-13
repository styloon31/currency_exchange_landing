import Image from "next/image";
import Form from "./Form";
import { Check } from "lucide-react";

export default function HeroForm() {
  return (
    <div className="relative bg-black/30 w-screen h-fit pb-5 md:pb-0 md:h-dvh overflow-x-hidden">
      <video
        src="/Video/forex.mp4"
        loop
        muted
        autoPlay
        className="absolute top-0 w-full h-full md:h-dvh object-cover object-center -z-10"
      />
      <div className="grid md:grid-cols-2 w-full h-full">
        <div className="col-span-1 px-10 flex flex-col justify-end pt-20 pb-10 md:pb-14">
          <div className="flex items-center gap-2 absolute top-5 md:top-20 md:left-16">
            <Image
              src="/Images/logo.jpg"
              width={500}
              height={500}
              alt="logo"
              className="h-10 w-10 md:h-12 md:w-12"
            />
            <h1 className="font-allround-bold text-2xl md:text-3xl text-black">
              7Janpath Forex
            </h1>
          </div>
          <div className=" flex-col gap-5 hidden md:flex">
            <Image 
              src="/Images/illustration.png"
              width={500}
              height={500}
              alt="illustration"
            />
            <ul className="font-Helvetica max-w-lg text-xs">
              <li className="flex gap-2 items-center"><Check  className="w-4 h-4"/> <span className="font-bold">Guaranteed Authentic Notes:</span> Sourced directly from verified RBI-licensed companies.</li>
              <li className="flex gap-2"><Check className="w-4 h-4"/> <span className="font-bold whitespace-nowrap">Best Rates Guaranteed:</span> We compare hundreds of money changers to find you the absolute best deals.</li>
              <li className="flex gap-2"><Check className="w-4 h-4"/> <span className="font-bold">Doorstep Delivery Today:</span> Enjoy the convenience of same-day delivery within Delhi NCR.</li>
              <li className="flex gap-2"><Check className="w-4 h-4"/> <span className="font-bold">20+ Currencies:</span> Travel the world with ease we offer a wide range of currencies.</li>
            </ul>
            {/* <h1 className="text-black font-allround-bold font-bold text-xl md:text-5xl">Need Foreign Currency Fast? We<span className="font-serif">'</span>ve Got You Covered</h1> */}
          </div>
        </div>
        <div className=" col-span-1 flex items-center justify-center w-full h-full relative z-10 px-10">
          <Form />
        </div>
      </div>
    </div>
  );
}
