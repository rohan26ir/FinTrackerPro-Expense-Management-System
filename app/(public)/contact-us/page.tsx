import ContactForm from "@/app/components/section/ContactForm";
import ContactGetTouch from "@/app/components/section/ContactGetTouch";




export default function page() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-10">

        <div className="mt-10 md:mt-14 lg:mt-20"><ContactForm></ContactForm></div>

        <div><ContactGetTouch></ContactGetTouch></div>
        
        <div></div>
        <div></div>
        <div></div>

      </div>
    </div>
  )
}