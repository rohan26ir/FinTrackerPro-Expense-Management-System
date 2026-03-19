import Image from "next/image";

import { Button } from "@/components/ui/button";


import coverImage from '@/public/banner/3d-illustration-bill-with-dollars-calculator.png'


const DBoardIntro = () => {

  const UserName: string = "Rohan";
  return (
    <div className="overflow-hidden rounded-lg bg-background  border border-border ">
      <div className="p-6">


        <div className="relative w-full h-auto  flex flex-col md:flex-row justify-between gap-5">

          {/* intro you self */}
          <div className="absolute top-1 left-1">
            <h3 className="paragraph">As-salamu alaykum  <br /> Mr/Ms {UserName} !!</h3>
          </div>


          {/* content */}
          <div className="w-full flex flex-col justify-center gap-5 mt-10">
            <h2 className="heading-2">Your Smart Financial Dashboard</h2>

            <p className="paragraph">
              {"Monitor your income, expenses, and savings with real-time insights. Stay organized, analyze trends, and take control of your financial future effortlessly."}
            </p>

            <div>
              <Button>
                Go Premium
              </Button>
            </div>
          </div>



          {/* Bg image */}
          <div className=" h-80 w-full  flex justify-end">
            <Image src={coverImage} alt="" height={800} width={800} className="w-auto h-full object-cover  opacity-65" />
          </div>



        </div>


      </div>
    </div>
  );
};

export default DBoardIntro;