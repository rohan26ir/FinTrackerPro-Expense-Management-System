import Image from "next/image";




const AboutWeHelp = () => {

  const items: {id: number, name: string, Count: number, CountWord: string}[] = [
    {id: 1, name:"Downloads", Count: 54, CountWord: "K+"},
    {id: 2, name:"Countries", Count: 25, CountWord: ""},
    {id: 3, name:"Positive Review", Count: 90, CountWord: "%"},
    {id: 4, name:"Spending Tracked", Count: 10, CountWord: "M"},
  ];


  const Users: {id: number, name: string, image: string}[] = [
    {id: 1, name:"jay", image: "/testimonials/jay.avif"},
    {id: 2, name:"kai", image: "/testimonials/kai.avif"},
    {id: 3, name:"leo", image: "/testimonials/leo.avif"},
  ]


  return (
    <div className="w-[95%] max-w-400 mx-auto">
      <div className="bg-secondary p-5 md:p-10 rounded-lg">
        <div>


          <div className="w-full flex flex-col justify-between gap-5 md:gap-10 lg:gap-20 ">
            {/* title */}
            <div className="flex flex-col md:flex-row justify-between md:gap-10 lg:gap-40 w-full ">
              <div className="w-full  ">
                <h2 className="heading-2">Feel confident. Reach your financial goals.</h2>
              </div>


              <div className="w-full text-start md:text-end space-y-3">
                <p className="paragraph-large">We help you take charge of your finances and move toward your goals, one smart step at a time.</p>

                {/* image */}
                <div className="flex flex-row justify-start md:justify-end items-center gap-1">
                  <div className="flex">
                    {
                      Users.map((user) => (
                        <div key={user.id} className="rounded-full overflow-hidden h-5 w-5">
                          <Image src={user.image} alt={user.name} height={100} width={100} className="bg-secondary h-full w-full" />
                        </div>
                      ))
                    }
                  </div>
                  <div>|</div>
                  <div><p className="paragraph">24k+ Happy users</p></div>
                </div>


              </div>

            </div>


            {/* body */}
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4  gap-5">
                    {
                      items.map((item) => (
                        <div key={item.id}  className="flex flex-col justify-center  items-start text-center gap-1">
                          <div className="heading-2">{item.Count}<span className="font-extrabold">{item.CountWord}</span></div>
                          <div className="paragraph-large">{item.name}</div>
                        </div>
                      ))
                    }
                  </div>
            </div>



          </div>


        </div>
      </div>
    </div>
  );
};

export default AboutWeHelp;