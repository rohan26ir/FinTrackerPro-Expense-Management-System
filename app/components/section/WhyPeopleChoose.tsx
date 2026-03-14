import Image from "next/image";
import { 
  Eye, 
  Bell, 
  Activity,
  TrendingDown,
} from "lucide-react";

import ImageWhy from "@/public/sections/smart-spenders.webp"
import WhyUS from "@/public/sections/man-showing-some.webp"

// import Link from "next/link";

const WhyPeopleChoose = () => {

  const features: { id: number; icon: React.ElementType; title: string; description: string }[] = [
    {
      id: 1,
      icon: TrendingDown,
      title: "Lower fees",
      description: "Our engine detects unused subscriptions, prevents overdrafts, and alerts you before hidden charges hit. Average user saves $240/year in bank fees.",
    },
    {
      id: 2,
      icon: Eye,
      title: "Better visibility",
      description: "Dashboards reveal exactly where your money goes: groceries, dining, bills, and small leaks. No blind spots just total spending clarity.",
    },
    {
      id: 3,
      icon: Bell,
      title: "Fewer surprises",
      description: "Proactive alerts catch unusual patterns (high bills, forgotten trials) before they disrupt your budget. Always stay one step ahead.",
    },
    {
      id: 4,
      icon: Activity,
      title: "Steady cashflow",
      description: "Unified timeline shows income and expenses weeks ahead perfect for irregular freelancers. Smooth tracking even during volatile months.",
    },
  ]

  return (
    <section className="w-[95%] max-w-400 mx-auto ">
      <div className="p-6 bg-secondary rounded-lg">
        {/* Desktop: Side by side layout */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-20">
          
          {/* Left - Image Section - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:w-[45%] md:flex flex-col justify-between gap-5 2xl:gap-2">
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
          <div className="w-full lg:w-[60%]">
            {/* Header */}
            <div className="flex flex-col gap-3 mb-8">
              <h2 className="heading-2 w-full">Why People Choose FinTrackerPro</h2>
              <p className="paragraph text-muted-foreground max-w-2xl">
                FinTrackerPro is the ultimate solution for managing your finances with ease and confidence. 
                Join thousands of satisfied users who have transformed their financial lives.
              </p>
            </div>

            {/* Mobile Image - Shows between description and features grid on mobile */}
            <div className="lg:hidden w-full mb-8">
              <div className="rounded-lg h-62.5 sm:h-75 relative group overflow-hidden">
                <Image 
                  src={ImageWhy}
                  alt="Why People Choose FinTrackerPro"
                  className="w-full h-full object-cover object-[35%_90%] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-6">
              {features.map((feature) => (
                <div 
                  key={feature.id} 
                  className="hover:bg-card  p-4  transition-all duration-300  group rounded-lg"
                >
                  {/* Icon with gradient background */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-background flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 ">
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-foreground " />
                  </div>
                  
                  <h3 className="heading-3 text-card-foreground mb-2 font-semibold">
                    {feature.title}
                  </h3>
                  <p className="paragraph-small text-muted-foreground">
                    {feature.description}
                  </p>
                  
                  
                </div>
              ))}
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPeopleChoose;