import ContactForm from "@/app/components/section/ContactForm";




export default function page() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-10">

        <div className="mt-10 md:mt-14 lg:mt-20"><ContactForm></ContactForm></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>

      </div>
    </div>
  )
}