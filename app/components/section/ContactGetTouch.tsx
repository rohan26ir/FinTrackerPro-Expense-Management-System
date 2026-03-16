import { Facebook, Instagram, Linkedin, MessagesSquare, PhoneOutgoing, Twitter } from "lucide-react";
import Image from "next/image";


import member from '@/public/avater/member.avif'
import { Button } from "../ui/button";


const ContactGetTouch = () => {

  const socialMedia: { id: number; name: string; href: string; icon: React.ReactNode; }[] = [
  { id: 1, name: "Facebook",  href:"" , icon: <Facebook /> },
  { id: 2, name: "Linkedin",  href:"" , icon: <Linkedin /> },
  { id: 3, name: "Instagram", href:"" , icon: <Instagram /> },
  { id: 4, name: "Twitter",   href:"" , icon: <Twitter /> },
];


  return (
    <div className="w-[95%] max-w-400 mx-auto">
      <div>
        <div>


          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20">
            
            {/* left */}
            <div className="w-full md:w-[80%] flex flex-col justify-between  gap-5">
              {/* heading */}
              <div className="w-full lg:w-[70%]">
                <h2 className="heading-2">Get in touch</h2>
                <p  className="paragraph">{"Don't Hesitate, we're just a message away. Our Super friendly team will get back to you as soon as possible"}</p>
              </div>
              {/* social */}
              <div className="space-y-2">
                <h3 className="heading-3">Social</h3>

                <div className="flex flex-wrap gap-5">
                  {
                    socialMedia.map((item) => (
                      <div key={item.id}  className="hover:bg-primary p-1 rounded hover:text-button">
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="" title={item.name}>
                         {item.icon}
                        </a>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

            {/* right */}
            <div className="w-full  grid grid-cols-2 gap-5 ">
              {/* 1 */}
              <div className="bg-card border border-border p-3 rounded-lg    flex flex-col justify-between gap-5">
                <div>
                  <div className="mb-1"><MessagesSquare /></div>
                  <h3 className="heading-3">Chat with us</h3>
                   <p className="paragraph-small">Talk to our friendly team</p>
                </div>
                <div>
                  <a href="mailto:hello@finmap.com">hello@finmap.com</a>
                </div>
              </div>
              {/* 2 */}
              <div className="bg-card border border-border p-3 rounded-lg    flex flex-col justify-between gap-5">
                <div>
                  <div className="mb-1"><PhoneOutgoing /></div>
                  <h3 className="heading-3">Phone</h3>
                   <p className="paragraph-small">Mon-Fri from 8am to 5pm.</p></div>
                <div>
                  <a href="tel:+1 (555) 000-0000">+1 (555) 000-0000</a>
                </div>
              </div>
              {/* 3 */}
              <div className="bg-card border border-border p-3 rounded-lg    flex flex-col justify-between gap-5">
                <div>
                  <div className="mb-1"><MessagesSquare /></div>
                  <h3 className="heading-3">Office</h3>
                   <p className="paragraph-small">Visit our office</p></div>
                <div>
                  <a href="https://maps.app.goo.gl/DZpkt9UaKmgLkQE78">Rozengracht 207B, 1016 LZ Amsterdam, Netherlands</a>
                </div>
              </div>
              {/* 4 */}
              <div className="bg-secondary border border-border p-3 rounded-lg   flex flex-col justify-between gap-5">

                {/* image text */}
                <div className=" flex flex-row justify-start gap-2">
                  <div className="w-16 h-20 md:h-16 rounded-lg overflow-hidden">
                    <Image src={member} alt="Support" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="heading-3">{"Let's Talk Live"}</h3>
                    <p className="paragraph-small">Book a quick call</p>
                   </div>
                  </div>

                {/* Button */}
                <div className="">
                  <Button>
                    Book a Call
                  </Button>
                </div>

              </div>


            </div>


          </div>


        </div>
      </div>
    </div>
  );
};

export default ContactGetTouch;