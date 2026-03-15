import Image from "next/image";

import volt from '@/public/icons/first-bolt.avif'
import fire from '@/public/icons/fire.avif'
import email from '@/public/icons/email.avif'
import location from '@/public/icons/location.avif'

import avater from '@/public/avater/girl.png'
import { Quote } from "lucide-react";

const MeetFinTracker = () => {
  return (
    <div className="w-[95%] max-w-400 mx-auto">
      <div className="bg-background">
        <div>
          <div className="grid grid-cols-2 md:grid-cols-6 grid-rows-auto md:grid-rows-6 gap-5">
            
           

            {/* 1st card - Users */}
            <div className="bg-button p-4 rounded-lg col-span-1 md:col-span-1 md:row-span-3 flex flex-col justify-center gap-2 order-2">
              <h2 className="heading-3">Users</h2>
              <p className="paragraph-small">Our user base is growing</p>
              <div className="flex flex-row justify-start gap-1 mt-5">
                <div className="h-18 w-20 rounded-lg bg-secondary overflow-hidden">
                  <Image src={avater} alt="avatar" width={100} height={100} className="w-full h-auto object-cover rounded-lg" />
                </div>
                <div className="h-18 w-20 rounded-lg bg-secondary overflow-hidden">
                  <Image src={avater} alt="avatar" width={100} height={100} className="w-full h-auto object-cover rounded-lg" />
                </div>
                <div className="h-18 w-20 rounded-lg bg-secondary overflow-hidden">
                  <Image src={avater} alt="avatar" width={100} height={100} className="w-full h-auto object-cover rounded-lg" />
                </div>
              </div>
            </div>

            {/* 2nd card - Features with fire */}
            <div className="bg-button p-4 rounded-lg col-span-1 md:col-span-2 md:row-span-3 flex  items-center h-full order-3">
              <div className="flex flex-col md:flex-row justify-center gap-2">
                <div className="h-full w-full md:w-1/3">
                  <Image src={fire} alt="fire" width={100} height={100} className="w-full h-auto object-cover rounded-lg" />
                </div>
                <div className="h-full w-full md:w-2/3">
                  <h3 className="heading-3">Features</h3>
                  <p className="paragraph-small">Discover the features that make FinTracker the perfect financial management tool.</p>
                </div>
              </div>
            </div>

            {/* 3rd card - Meet FinTracker - MOVED TO TOP on mobile */}
            <div className="p-4 rounded-lg col-span-2 md:col-span-3 md:row-span-3 flex flex-col justify-center order-1 md:order-3">
              <h2 className="heading-2">Meet FinTracker</h2>
              <p className="paragraph-large">Discover how FinTracker can help you manage your finances more effectively.</p>
            </div>

            {/* 5th cards - Stats and Location */}
            <div className="md:col-span-1 md:row-span-6 flex flex-col gap-2 order-5">
              <div className="bg-button p-4 rounded-lg h-full flex flex-col justify-center gap-2">
                <h3 className="heading-3">10+</h3>
                <p className="paragraph">Enjoy more then 10 features</p>
              </div>
              <div className="bg-button p-4 rounded-lg h-full flex flex-col justify-center text-center">
                <div className="h-20 flex flex-row justify-center">
                  <Image src={location} alt='location' height={100} width={100} className="object-contain h-full w-auto"/>
                </div>
                <p className="paragraph">Users from around the World</p>
              </div>
            </div>

            {/* 4th card - Email features */}
            <div className="bg-button p-4 rounded-lg col-span-2 md:col-span-2 md:row-span-4 order-4">
              <div className="flex flex-col justify-center text-center gap-2">
                <div className="h-36">
                  <Image src={email} alt="fire" height={100} className="w-full h-full object-contain rounded-lg" />
                </div>
                <div>
                  <h3 className="heading-3">Features</h3>
                  <p className="paragraph-small">Discover the features</p>
                </div>
              </div>
            </div>

            {/* 6th cards - Testimonial */}
            <div className="bg-button p-4 rounded-lg col-span-2 md:col-span-2 md:row-span-4 flex flex-col justify-center order-6">
              <div className="flex flex-col justify-center gap-5 text-center">
                <div className="w-[80%] mx-auto flex flex-col justify-center items-center gap-3">
                  <Quote size={50}/>
                  <p className="paragraph">{`"A world-class reading, watching, and listening experience"`}</p>
                </div>
                <div>
                  <h3 className="heading-3">Emily Davis</h3>
                  <p className="paragraph-large">Financial Advisor</p>
                </div>
              </div>
            </div>

            {/* 7th card - Bolt */}
            <div className="bg-button p-4 rounded-lg md:col-span-1 md:row-span-3 flex flex-col justify-center text-center order-5 md:order-7">
              <div className="h-36">
                <Image src={volt} alt="bolt" width={100} height={100} className="w-full h-full object-contain rounded-lg" />
              </div>
              <p className="paragraph-small">Effortlessly track your expenses and income.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetFinTracker;