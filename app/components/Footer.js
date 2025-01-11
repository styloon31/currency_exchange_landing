import Image from "next/image";
import FooterForm from "./FooterForm";

export default function Footer() {
  return (
    <section className="w-screen h-[50dvh] px-20 relative overflow-hidden">
      <div className="flex items-center gap-2 relative top-4">
        <Image
          src="/Images/logo.jpg"
          width={500}
          height={500}
          alt="logo"
          className="h-12 w-12"
        />
        <h1 className="font-allround-bold text-3xl">7janpath</h1>
      </div>
      <div className="bg-blue-200 w-full h-[80%] mt-10 rounded-r-3xl rounded-l-3xl">
        <div className="grid grid-cols-2 w-full h-full">
          <div className="col-span-1 flex items-center justify-center">
            <h1 className=" text-7xl font-allround-bold">Contact Us</h1>
          </div>
          <div className=" col-span-1 flex items-center justify-center">
            <FooterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
