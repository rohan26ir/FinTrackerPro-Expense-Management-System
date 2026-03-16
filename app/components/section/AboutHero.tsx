import Image from "next/image";

import heroImage from '@/public/sections/aboutHero.avif'


const AboutHero = () => {
  return (
    <div className="w-[95%] max-w-400 mx-auto">
      <div>

        <div className="flex flex-col gap-5 md:gap-15">

          {/* title */}
          <div className="w-[90%] md:w-[70%] lg:w-[30%] mx-auto text-center">
            <h2 className="heading-2">About Us</h2>
             <p className="paragraph">{"Hey there! We are DailyFin, where we’re all about making your money management a breeze."}</p>
          </div>

          {/* image */}
          <div className="mx-auto w-full md:w-[80%] h-40 md:h-60 lg:h-140  rounded-lg overflow-hidden">
            <Image src={heroImage} alt="About Daily FinTracker" height={800} className="object-cover h-full w-full" />
          </div>


        </div>

      </div>
    </div>
  );
};

export default AboutHero;