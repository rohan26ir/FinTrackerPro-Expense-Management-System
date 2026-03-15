import Image from "next/image";

import ImageWhy from "@/public/sections/smart-spenders.webp"
import WhyUS from "@/public/sections/man-showing-some.webp"
import FAQ from "../ui/FAQ";

// import Link from "next/link";

const WhyChooseUS = () => {

  const faqs: { id: number; question: string; answer: string }[] = [
    {
      id: 1,
      question: "What are the benefits of using FinTrackerPro?",
      answer: "Our engine detects unused subscriptions, prevents overdrafts, and alerts you before hidden charges hit. Average user saves $240/year in bank fees.",
    },
    {
      id: 2,
      question: "How does FinTrackerPro help with budgeting?",
      answer: "FinTrackerPro provides real-time insights into your spending habits, helping you identify areas where you can cut costs and allocate funds more effectively."
    },
    {
      id: 3,
      question: "How do the alerts work?",
      answer: "Proactive alerts catch unusual patterns (high bills, forgotten trials) before they disrupt your budget. Always stay one step ahead."
    },
    {
      id: 4,
      question: "How does the cashflow tracking work?",
      answer: "Unified timeline shows income and expenses weeks ahead perfect for irregular freelancers. Smooth tracking even during volatile months.",
    },
  ]

  return (
    <section className="w-[95%] max-w-400 mx-auto ">
      <div className="p-6 bg-secondary rounded-lg">
        {/* Desktop: Side by side layout */}
        <div className="flex flex-col lg:flex-row-reverse justify-between gap-8 lg:gap-20">
          
          {/* Left - Image Section - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:w-[45%] lg:flex flex-col justify-between gap-5 2xl:gap-10">
            <div className="rounded-lg h-full 2xl:max-h-80 relative group overflow-hidden">
              <Image 
                src={ImageWhy}
                alt="Why People Choose FinTrackerPro"
                className="w-full h-full object-cover object-[35%_90%] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></div>
            </div>
            <div className="rounded-lg h-full 2xl:max-h-80 relative group overflow-hidden">
              <Image 
                src={WhyUS}
                alt="Why People Choose FinTrackerPro"
                className="w-full h-full object-cover object-[35%_90%] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></div>
            </div>
          </div>
          
          {/* Right - Features Section */}
          <div className="w-full lg:w-[60%]  h-full  flex flex-col justify-between gap-8">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <h2 className="heading-2 w-full">Why Choose Us</h2>
              <p className="paragraph text-muted-foreground max-w-2xl">
                {"We’re not just another finance app. We’re your proactive partner in mastering money. With real-time insights, personalized alerts, and a user-friendly interface, we empower you to take control of your finances and make smarter decisions every day."}
              </p>
            </div>

            {/* Mobile Image - Shows between description and features grid on mobile */}
            <div className="lg:hidden w-full ">
              <div className="rounded-lg h-62.5 sm:h-75 relative group overflow-hidden">
                <Image 
                  src={ImageWhy}
                  alt="Why People Choose FinTrackerPro"
                  className="w-full h-full object-cover object-[35%_90%] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></div>
              </div>
            </div>

            {/* FAQs */}
            <div className="h-auto lg:h-120">
              <FAQ items={faqs}></FAQ>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUS;