'use client';

import Lottie from 'lottie-react';
import lottieImage from '@/public/lottie/money_investment.json';
import { Button } from '../ui/button';

// import Image from 'next/image';
// import bgImage from '@/public/banner/money-transfer-global-currency.avif';

const HomeHero = () => {
  return (
    <div className="w-[95%] max-w-400 mx-auto m-1">
      <div className=" bg-secondary rounded-lg p-6 border border-accent relative overflow-hidden">

        {/* <div>
          <Image src={bgImage} alt="Background Image" fill className="object-cover opacity-80" />
        </div> */}
        
        {/* Mobile Layout (visible on small screens) */}
        <div className='block md:hidden space-y-6'>
          {/* 1. Heading and paragraph */}
          <div className='text-center'>
            <h2 className="heading-2">Daily Financial Insights</h2>
            <p className='paragraph'>Stay informed with our daily financial updates and market analysis.</p>
          </div>
          
          {/* 2. Lottie animation */}
          <div className='flex justify-center h-80'>
            <div className="max-w-75">
              <Lottie animationData={lottieImage} loop={true} />
            </div>
          </div>
          
          {/* 3. Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <Button className="w-full sm:w-auto">
              Get Started
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>

        {/* Desktop Layout (hidden on mobile) */}
        <div className='hidden md:grid md:grid-cols-2 gap-5 items-center '>
          {/* Left column - Vertically centered */}
          <div className='space-y-4'>
            <h2 className="heading-2">Daily Financial Insights</h2>
            <p className='paragraph'>Stay informed with our daily financial updates and market analysis.</p>
            <div className='flex gap-1 md:gap-3'>
              <Button>Get Started</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
          
          {/* Right column */}
          <div className='flex justify-center h-125'>
            <Lottie animationData={lottieImage} loop={true}  />
          </div>
        </div>

      </div>      
    </div>
  );
};

export default HomeHero;