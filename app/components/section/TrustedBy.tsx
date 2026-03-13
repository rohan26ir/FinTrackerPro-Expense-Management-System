import Image from "next/image";
import Marquee from "react-fast-marquee";

const TrustedBy = () => {
  const companies: { name: string; logo: string }[] = [
    { name: 'Seeders', logo: '/company/seeders_-__logo.svg' },
    { name: '11fs', logo: '/company/11fs_-_logo.svg' },
    { name: 'Seeders', logo: '/company/seeders_-__logo.svg' },
    { name: 'Algolia', logo: '/company/algolia_-_logo.svg' },
    { name: 'Seeders', logo: '/company/seeders_-__logo.svg' },
    { name: 'Habito', logo: '/company/habito_-_logo.svg' },
    { name: 'Seeders', logo: '/company/seeders_-__logo.svg' },
    { name: 'Huckletree', logo: '/company/huckletree_-_logo.svg' },
    { name: 'Seeders', logo: '/company/seeders_-__logo.svg' },
  ];

  return (
    <div className="w-[95%] max-w-400 mx-auto">
        <div className="bg-secondary p-6">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div>
            <h2 className="heading-2">Trusted By Companies</h2>
          </div>
          <div className="w-60 text-start md:text-end">
            <p className="paragraph">Trusted by thousands of companies worldwide</p>
          </div>
        </div>
        
        <div>
          <Marquee gradient={false} speed={40} pauseOnHover={true}>
            <div className="flex items-center gap-16 mx-8">
              {companies.map((company, index) => (
                <div key={index} className="flex items-center justify-center ">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={120}
                    height={60}
                    className="object-contain hover:scale-110 hover:grayscale-0 transition-all duration-300 cursor-pointer "
                  />
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;