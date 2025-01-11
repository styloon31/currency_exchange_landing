import Image from "next/image";

export default function Third() {
  return (
    <section className="w-screen min-h-[70dvh] overflow-x-hidden py-8 md:py-20 relative flex items-center justify-center bg-blue-200">
      <div className="bg-white py-12 w-full">
        <div className="mx-auto px-6 md:px-12 lg:px-20 w-full items-center justify-center">
          {/* Header Section */}
          <div className="text-center mb-10 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-3 bg-blue-100 font-allround-medium border-blue-300 border-2 text-blue-600 text-xs md:text-sm px-4 py-2 rounded-full uppercase font-medium">
              <Image
                src="/Images/globe.svg"
                alt="globe"
                height={500}
                width={500}
                className="h-5 w-5 md:h-6 md:w-6"
              />
              <span>Your Travel Assistant</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-allround-bold font-bold text-gray-800 mt-4 leading-tight">
              Why Choose Us?
            </h2>
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-600 mt-2 font-Helvetica max-w-md text-sm md:text-base leading-relaxed">
                We&apos;re not just about transactions, we
                &apos;re about relationships. Here&apos;s why we&aposre
                the first choice for individuals and corporations alike.
              </p>
            </div>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-lg text-center border-blue-300 border-2">
              <div className="text-blue-400 text-3xl md:text-4xl mb-4">⚡</div>
              <h3 className="font-bold text-2xl md:text-3xl font-allround-bold text-gray-800">
                Direct, Instant Service
              </h3>
              <p className="text-gray-600 mt-4 font-Helvetica text-sm md:text-base leading-relaxed">
                No hidden fees or surprises. Our rates are upfront and
                competitive.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-lg text-center border-blue-300 border-2">
              <div className="text-blue-400 text-3xl md:text-4xl mb-4">🏆</div>
              <h3 className="font-bold text-2xl md:text-3xl font-allround-bold text-gray-800">
                28 Years of Forex Expertise
              </h3>
              <p className="text-gray-600 mt-4 font-Helvetica text-sm md:text-base leading-relaxed">
                Our knowledge is your advantage in the currency markets, guiding
                you to financial success.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-lg text-center border-blue-300 border-2">
              <div className="text-blue-400 text-3xl md:text-4xl mb-4">💼</div>
              <h3 className="font-bold text-2xl md:text-3xl font-allround-bold text-gray-800">
                A Well Known Brand in Foreign Exchange
              </h3>
              <p className="text-gray-600 mt-4 font-Helvetica text-sm md:text-base leading-relaxed">
                No hidden fees or surprises. Our rates are upfront and
                competitive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
