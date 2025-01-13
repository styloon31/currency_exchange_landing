export default function Second() {
  return (
    <section className="w-screen h-auto min-h-[50dvh] relative overflow-x-hidden px-5 md:px-20 py-10">
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section */}
        <div className="flex items-center justify-center">
          <h1 className="font-allround-bold font-bold text-4xl md:text-7xl text-blue-400 text-center">
            What do we do
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center">
          <p className="font-Helvetica text-base md:text-xl text-justify">
            7Janpath Forex is your go-to source for seamless foreign exchange.
            We offer competitive rates on a wide range of currencies, including
            popular travel currencies like USD, EUR, and GBP. Our services
            include convenient travel money cards, hassle-free international
            money transfers, and expert advice to help you make informed
            decisions. Travel smarter with 7Janpath Forex.
          </p>
        </div>
      </div>
    </section>
  );
}
