import AboutHero from "@/app/components/section/AboutHero";
import AboutWeHelp from "@/app/components/section/AboutWeHelp";




export default function page() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-10 md:gap-20  my-10 md:my-14 lg:my-20">


        <div><AboutHero></AboutHero></div>

        <div><AboutWeHelp></AboutWeHelp></div>
        
        {/* <div></div> */}

      </div>
    </div>
  )
}