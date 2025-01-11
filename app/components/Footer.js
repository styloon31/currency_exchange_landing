import Image from "next/image";
import FooterForm from "./FooterForm";

export default function Footer() {
  return (
    <section className="w-screen min-h-[50dvh] px-5 md:px-20 relative overflow-hidden">
      {/* Logo Section */}
      <div className="flex items-center gap-2 relative top-4">
        <Image
          src="/Images/logo.jpg"
          width={500}
          height={500}
          alt="logo"
          className="h-10 w-10 md:h-12 md:w-12"
        />
        <h1 className="font-allround-bold text-2xl md:text-3xl">7Janpath Forex</h1>
      </div>

      {/* Main Content Section */}
      <div className="bg-blue-200 w-full mt-10 rounded-tl-3xl rounded-tr-3xl p-4 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
          {/* Contact Us Section */}
          <div className="col-span-1 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-allround-bold text-center">
              Talk to forex Expert
            </h1>
          </div>
          {/* Footer Form Section */}
          <div className="col-span-1 flex items-center justify-center">
            <FooterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
