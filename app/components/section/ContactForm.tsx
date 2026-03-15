'use client'

import Image from "next/image";
import formImage from '@/public/sections/contact.avif'
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "react-toastify";

interface FormData {
  Name: string;
  Email: string;
  Topic: string;
  Message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    Name: '',
    Email: '',
    Topic: '',
    Message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const ContactFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Form submission logic
    console.log('Form submitted with data:', formData);

    // Example: send to API
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    toast(`✨ Message sent! We'll contact you at ${formData.Email}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })

    // Reset form if needed
    setFormData({ Name: '', Email: '', Topic: '', Message: '' });

  }

  return (
    <div className="w-[95%] max-w-400 mx-auto">
      <div className="bg-background">
        <div className="flex flex-col justify-between items-center gap-14">
          {/* title */}
          <div className="flex flex-col justify-center gap-2 text-center w-full md:w-[25%]">
            <h2 className="heading-2">Contact Us</h2>
            <p className="paragraph">Have a question, suggestion, or just want to say hello? Our team is ready to assist</p>
          </div>

          {/* content */}
          <div className="w-full md:w-300 flex flex-col-reverse md:flex-row justify-center gap-5">
            {/* form field */}
            <div className="w-full border border-border p-5 rounded-lg  flex flex-col gap-5">

              <div>
                <h3 className="heading-3">Send us a message</h3>
                 <p className="paragraph">{"Don't Hesitate, we're just a message away. Our Super friendly team will get back to you as soon as possible"}</p>
              </div>

              <form onSubmit={ContactFormSubmit} method="post" className=" flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="Name"
                    value={formData.Name}
                    onChange={handleInputChange}
                    placeholder="Jane Smith"
                    id="name"
                    className="min-h-10 p-2.5 border border-border rounded-sm"
                    autoComplete="on"
                  />
                </div>
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                    placeholder="jane@gmail.com"
                    id="email"
                    className="min-h-10 p-2.5 border border-border rounded-sm"
                    autoComplete="on"
                    required
                  />
                </div>
                {/* Subject */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="topic">Topic</label>
                  <input
                    type="text"
                    name="Topic"
                    value={formData.Topic}
                    onChange={handleInputChange}
                    placeholder="Topic name"
                    id="topic"
                    className="min-h-10 p-2.5 border border-border rounded-sm"
                    autoComplete="on"
                  />
                </div>
                {/* Message */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="message">Message*</label>
                  <textarea
                    minLength={20}
                    name="Message"
                    value={formData.Message}
                    onChange={handleInputChange}
                    placeholder="Type here..."
                    id="message"
                    className="min-h-36 p-2.5 border border-border rounded-sm"
                    required
                  />
                </div>

                <div>
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </div>
              </form>
            </div>

            {/* Image */}
            <div className="w-full rounded-lg overflow-hidden">
              <Image
                src={formImage}
                alt="Contact Form"
                width={800}
                height={600}
                className="h-full w-full object-cover"
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;