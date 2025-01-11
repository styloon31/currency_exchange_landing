import Image from "next/image";
import Form from "./Form";

export default function HeroForm() {
  return (
    <div className="relative w-screen h-fit pb-5 md:pb-0 md:h-dvh overflow-x-hidden">
      <video
        src="/Video/forex.mp4"
        loop
        muted
        autoPlay
        className="absolute top-0 w-full h-full md:h-dvh object-cover object-center -z-10"
      />
      <div className="grid md:grid-cols-2 w-full h-full">
        <div className="col-span-1 px-10 flex flex-col justify-end pt-20 pb-10 md:pb-20">
          <div className="flex items-center gap-2 absolute top-5 md:top-20 md:left-16">
            <Image
              src="/Images/logo.jpg"
              width={500}
              height={500}
              alt="logo"
              className="h-10 w-10 md:h-12 md:w-12"
            />
            <h1 className="font-allround-bold text-2xl md:text-3xl text-white">
              7janpath
            </h1>
          </div>
          <div>
            <h1 className="text-white font-allround-bold font-bold text-xl md:text-5xl">Connecting Global Markets, Empowering Your Financial Future.</h1>
          </div>
        </div>
        <div className=" col-span-1 flex items-center justify-center w-full h-full relative z-10 px-10">
          <Form />
        </div>
      </div>
    </div>
  );
}
