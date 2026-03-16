import ContactForm from "@/app/components/section/ContactForm";
import ContactGetTouch from "@/app/components/section/ContactGetTouch";
import ContactMap from "@/app/components/section/ContactMap";




export default function page() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-10  my-10 md:my-14 lg:my-20">

        <div className=""><ContactForm></ContactForm></div>

        <div><ContactMap></ContactMap></div>
        
        <div><ContactGetTouch></ContactGetTouch></div>

        {/* <div></div> */}
        {/* <div></div> */}

      </div>
    </div>
  )
}