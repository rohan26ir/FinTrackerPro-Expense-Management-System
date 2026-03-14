'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

const Testimonials = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const testimonials: { id: number; name: string; title: string; rating: number; quote: string; avatar: string }[] = [
    {
      id: 1,
      name: "John Doe",
      title: "CEO at Company",
      rating: 5,
      quote: "This product has transformed the way we manage our finances. Highly recommended!",
      avatar: "/testimonials/jay.avif",
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "Freelancer",
      rating: 4.5,
      quote: "An essential tool for tracking my expenses and income. It has made budgeting so much easier!",
      avatar: "/testimonials/kai.avif",
    },
    {
      id: 3,
      name: "Michael Johnson",
      title: "Small Business Owner",
      rating: 3,
      quote: "The insights and analytics provided by this system have been invaluable for our financial planning.",
      avatar: "/testimonials/leo.avif",
    },
    {
      id: 4,
      name: "Emily Davis",
      title: "Financial Advisor",
      rating: 4.8,
      quote: "I recommend this product to all my clients. It's user-friendly and provides powerful financial insights.",
      avatar: "/testimonials/max.avif",
    },
    {
      id: 5,
      name: "David Wilson",
      title: "Entrepreneur",
      rating: 4.2,
      quote: "A must-have for anyone looking to take control of their financial life. The analytics are top-notch!",
      avatar: "/testimonials/ray.avif",
    },
    {
      id: 6,
      name: "Sarah Brown",
      title: "Accountant",
      rating: 5,
      quote: "This system has streamlined our financial tracking and reporting. It's a game-changer for our business.",
      avatar: "/testimonials/sam.avif",
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="w-[95%] max-w-400 mx-auto ">
        {/* Header with title and custom navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="heading-2 text-foreground mt-2">
              What Our Clients Say
            </h2>
            <p className="paragraph text-muted-foreground mt-2 max-w-2xl">
              Trusted by thousands of businesses and individuals worldwide
            </p>
          </div>
          
          {/* Custom Navigation Buttons */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-12 h-12 rounded-full bg-secondary hover:bg-primary/25 border border-border flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-button transition-colors" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 rounded-full bg-secondary hover:bg-primary/25 border border-border flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground group-hover:text-button transition-colors" />
            </button>
          </div>
        </div>

        {/* Swiper Component */}
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: false,
            dynamicBullets: false,
          }}
          navigation={false}
          modules={[Autoplay, Navigation]}
          className="pb-12!"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="h-auto ">
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-button/30 group ml-1">
                {/* Quote Icon */}
                <div className="mb-4">
                  <svg 
                    className="w-8 h-8 text-foreground" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Quote */}
                <blockquote className="flex-1">
                  <p className="paragraph text-card-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Rating Stars */}
                <div className="flex gap-1 my-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 fill-accent-foreground text-foreground" 
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-4">
                    {/* Avatar with Image component */}
                    <div className="rounded-full border border-border overflow-hidden flex items-center justify-center w-12 h-12">
                      <Image 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover w-full h-full"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = testimonial.name.charAt(0);
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="subtitle text-card-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="caption text-muted-foreground">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;