import HomeHero from "../components/pages/HomeHero";
import MeetFinTracker from "../components/section/MeetFinTracker";
import Subscription from "../components/section/Subscription";
import Testimonials from "../components/section/Testimonials";
import TrustedBy from "../components/section/TrustedBy";
import WhyChooseUS from "../components/section/WhyChooseUS";
import WhyPeopleChoose from "../components/section/WhyPeopleChoose";





export default function Home() {
  return (
    <div className="flex flex-col gap-20 mb-20">
      
      <div><HomeHero></HomeHero></div>

      <div><TrustedBy></TrustedBy></div>
      
      <div><MeetFinTracker></MeetFinTracker></div>
      
      <div><Testimonials></Testimonials></div>
      
      <div><WhyPeopleChoose></WhyPeopleChoose></div>
      
      <div><Subscription></Subscription></div>
      
      <div><WhyChooseUS></WhyChooseUS></div>



    </div>
  )
}