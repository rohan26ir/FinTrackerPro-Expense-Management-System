const DBoardQuickStats = () => {
  
  // Define stats data in an array for better maintainability
  const statsData = [
    
    {
      id: 1,
      title: "Total Savings",
      value: 8500.50,
      percentage: 15,
      type: "+",
      bgColor: "bg-[#E6F3FF]"
    },
    {
      id: 2,
      title: "Current Balance",
      value: 10500.25,
      percentage: 19,
      type: "+",
      bgColor: "bg-[#F3FCF9]"
    },
    {
      id: 3,
      title: "Total Income",
      value: 25000.55,
      percentage: 7,
      type: "+",
      bgColor: "bg-[#FAF4FF]"
    },
    {
      id: 4,
      title: "Total Expenses",
      value: 16500.75,
      percentage: 25,
      type: "+",
      bgColor: "bg-[#FFF3F7]"
    },
  ];

  // Format currency function
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Get percentage color based on type and value
  const getPercentageColor = (title: string, type: string): string => {
    if (title === "Total Expenses") {
      return type === "+" ? "text-red-500" : "text-green-500";
    }
    return type === "+" ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="w-full max-w-400 mx-auto">
      <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 justify-start gap-2 md:gap-5">
        
        {statsData.map((stat) => (
          <div 
            key={stat.id}
            className={`${stat.bgColor} border-border p-5 rounded-lg transition-all duration-300 hover:shadow-lg`}
          >
            <div className="flex flex-col justify-center gap-5">
              <p className="paragraph text-gray-600 font-medium">{stat.title}</p>
              <div>
                <h3 className="heading-4 text-2xl font-bold mb-2 text-black">
                  {formatCurrency(stat.value)}
                </h3>
                <span className={getPercentageColor(stat.title, stat.type)}>
                  {stat.type}{stat.percentage}%
                </span>
              </div>
            </div>
          </div>
        ))}

      </div>     
    </div>
  );
};

export default DBoardQuickStats;