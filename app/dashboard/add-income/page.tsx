import DboardIncomeAdd from "@/app/components/dashboard/DboardIncomeAdd";
import DboardIncomeIntro from "@/app/components/dashboard/DboardIncomeIntro";




export default function page() {
  return (
    <div>

      <div className="flex flex-col gap-5 md:gap-8">

        <div><DboardIncomeIntro></DboardIncomeIntro></div>

        <div><DboardIncomeAdd></DboardIncomeAdd></div>

      </div>
    
    </div>
  )
}