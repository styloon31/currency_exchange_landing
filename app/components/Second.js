export default function Second() {
    return (
      <section className="w-screen h-auto min-h-[70dvh] relative overflow-x-hidden px-5 md:px-20 py-10">
        <div className="grid w-full h-full grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Section */}
          <div className="flex items-center justify-center">
            <h1 className="font-Sauce-Tomato font-bold text-4xl md:text-6xl text-blue-400 text-center">
              What do we do
            </h1>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center justify-center">
            <p className="font-allround-medium text-base md:text-xl text-justify leading-relaxed">
              7janpath provides essential services that enable individuals and
              businesses to convert one currency into another. The company plays a
              critical role in facilitating international trade, travel, and
              investments by offering competitive exchange rates for buying and
              selling foreign currencies. It caters to travelers needing foreign
              cash, businesses conducting transactions in different currencies,
              and investors managing foreign assets. In addition to exchanging
              physical cash, 7janpath also provides services like wire transfers,
              forex cards, remittances, and online trading platforms for currency
              exchange. Its expertise in monitoring global exchange rate
              fluctuations ensures customers receive accurate and reliable
              currency conversion services.
            </p>
          </div>
        </div>
      </section>
    );
  }
  