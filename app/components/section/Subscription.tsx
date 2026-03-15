'use client';

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annually: number;
  };
  features: {
    name: string;
    included: boolean;
  }[];
  buttonText: string;
  buttonVariant: 'primary' | 'secondary';
  popular?: boolean;
  bestValue?: boolean;
}

const Subscription = () => {
  const [selectedTab, setSelectedTab] = useState<'monthly' | 'annually'>('monthly');

  const handleTabClick = (tab: 'monthly' | 'annually') => {
    setSelectedTab(tab);
  };

  // Plan data stored in array of objects with feature flags
  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for individuals just getting started with financial tracking.',
      price: {
        monthly: 0, // Free on monthly too
        annually: 0 // Free on annual
      },
      features: [
        { name: 'Basic expense tracking', included: true },
        { name: 'Up to 5 bank accounts', included: true },
        { name: 'Monthly reports', included: true },
        { name: 'Email support', included: true },
        { name: 'Unlimited accounts', included: false },
        { name: 'Real-time alerts', included: false },
        { name: 'Investment tracking', included: false },
        { name: 'Priority support', included: false },
        { name: 'Team access (up to 5)', included: false },
        { name: 'API access', included: false },
        { name: 'Custom reports', included: false },
        { name: 'Dedicated account manager', included: false }
      ],
      buttonText: 'Start Free',
      buttonVariant: 'secondary'
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For power users who need advanced features and insights.',
      price: {
        monthly: 19.99,
        annually: 179.99
      },
      features: [
        { name: 'Basic expense tracking', included: true },
        { name: 'Up to 5 bank accounts', included: true },
        { name: 'Monthly reports', included: true },
        { name: 'Email support', included: true },
        { name: 'Unlimited accounts', included: true },
        { name: 'Real-time alerts', included: true },
        { name: 'Investment tracking', included: true },
        { name: 'Priority support', included: true },
        { name: 'Team access (up to 5)', included: false },
        { name: 'API access', included: false },
        { name: 'Custom reports', included: false },
        { name: 'Dedicated account manager', included: false }
      ],
      buttonText: 'Get Started',
      buttonVariant: 'primary',
      popular: true
    },
    {
      id: 'business',
      name: 'Business',
      description: 'For teams and businesses managing multiple finances.',
      price: {
        monthly: 29.99,
        annually: 269.99
      },
      features: [
        { name: 'Basic expense tracking', included: true },
        { name: 'Up to 5 bank accounts', included: true },
        { name: 'Monthly reports', included: true },
        { name: 'Email support', included: true },
        { name: 'Unlimited accounts', included: true },
        { name: 'Real-time alerts', included: true },
        { name: 'Investment tracking', included: true },
        { name: 'Priority support', included: true },
        { name: 'Team access (up to 5)', included: true },
        { name: 'API access', included: true },
        { name: 'Custom reports', included: true },
        { name: 'Dedicated account manager', included: true }
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary',
      bestValue: selectedTab === 'annually' ? true : false
    }
  ];

  // Calculate savings for annual (except for Basic which is free)
  const calculateSavings = (monthlyPrice: number, annualPrice: number) => {
    if (monthlyPrice === 0) return null;
    return (monthlyPrice * 12 - annualPrice).toFixed(2);
  };

  return (
    <section className="w-[95%] max-w-400 mx-auto">
      <div className="">
        <div className="bg-background">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-wider text-button">
              Pricing
            </span>
            <h2 className="heading-2 text-foreground mt-2">
              Choose Your Plan
            </h2>
            <p className="paragraph text-muted-foreground mt-4 max-w-2xl mx-auto">
              Select the perfect subscription that fits your needs. Cancel anytime.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex flex-col items-center">
            <div className="flex flex-row justify-center gap-2 p-1 bg-secondary/50 rounded-lg  mb-8">
              <button 
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedTab === 'monthly' 
                    ? 'bg-button text-button-foreground shadow-md' 
                    : 'bg-transparent text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => handleTabClick('monthly')}
              >
                Monthly
              </button>
              <button 
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 relative ${
                  selectedTab === 'annually' 
                    ? 'bg-button text-button-foreground shadow-md' 
                    : 'bg-transparent text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => handleTabClick('annually')}
              >
                Annually
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>

            {/* Pricing Cards - All same height with flex col */}
            <div className="mt-10 w-full max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-button/0 relative flex flex-col h-full ${
                      plan.popular 
                        ? 'border-2 border-border md:scale-105 z-10' 
                        : plan.bestValue && selectedTab === 'annually'
                        ? 'border border-border md:scale-100 z-10'
                        : 'border-border'
                    }`}
                  >
                    {/* Popular/Best Value Badge */}
                    {(plan.popular || (plan.bestValue && selectedTab === 'annually')) && (
                      <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 text-foreground text-xs px-3 py-1 rounded-full whitespace-nowrap ${
                        plan.popular ? 'bg-button' : 'bg-primary/20'
                      }`}>
                        {plan.popular ? 'Most Popular' : 'Best Value'}
                      </div>
                    )}

                    <h3 className="subtitle text-card-foreground mb-2">{plan.name}</h3>
                    
                    {/* Price Section - Same height for all cards */}
                    <div className="mb-1 min-h-25">
                      {plan.price.monthly === 0 ? (
                        // Free plan
                        <div>
                          <span className="text-3xl font-bold text-green-500">Free</span>
                          <span className="text-muted-foreground ml-1">
                            {selectedTab === 'monthly' ? '/month' : '/year'}
                          </span>
                          <div className="text-xs text-green-500 font-medium mt-1">
                            ✓ Forever free plan
                          </div>
                          {/* Empty div to match height of savings text in other cards */}
                          {selectedTab === 'monthly' && <div className="h-4"></div>}
                        </div>
                      ) : (
                        // Paid plans
                        <div>
                          <span className="text-3xl font-bold">
                            ${selectedTab === 'monthly' ? plan.price.monthly : plan.price.annually}
                          </span>
                          <span className="text-muted-foreground">
                            {selectedTab === 'monthly' ? '/month' : '/year'}
                          </span>
                          
                          {/* Savings text - always show a placeholder for monthly view to maintain height */}
                          {selectedTab === 'annually' ? (
                            <p className="text-xs text-green-500 mt-1">
                              Save ${calculateSavings(plan.price.monthly, plan.price.annually)} vs monthly
                            </p>
                          ) : (
                            <p className="text-xs text-transparent mt-1 select-none">
                              Save $0 vs annual
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Description - fixed height to ensure consistency */}
                    <p className="paragraph-small text-muted-foreground mb-6 ">
                      {plan.description}
                    </p>

                    {/* Features List - flex-1 makes this expand to fill available space */}
                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          {feature.included ? (
                            <span className="shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                              <Check className="w-3.5 h-3.5 text-green-500" />
                            </span>
                          ) : (
                            <span className="shrink-0 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center mt-0.5">
                              <X className="w-3.5 h-3.5 text-red-400" />
                            </span>
                          )}
                          <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Button - always at bottom */}
                    <button 
                      className={`w-full py-2 rounded-lg transition-colors duration-300 mt-auto cursor-pointer ${
                        plan.buttonVariant === 'primary'
                          ? 'bg-secondary text-button-foreground hover:bg-button/20'
                          : plan.price.monthly === 0
                          ? 'bg-primary text-white '
                          : 'bg-secondary hover:bg-button/20 text-foreground'
                      }`}
                    >
                      {plan.buttonText}
                    </button>


                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>      
    </section>
  );
};

export default Subscription;