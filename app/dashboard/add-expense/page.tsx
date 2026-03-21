// add-expense page.tsx

import DboardExpenseAdd from "@/app/components/dashboard/DboardExoenseAdd";



export default function page() {
  return (
    <div>

      <div className="flex flex-col gap-5 md:gap-8">

        <div><DboardExpenseAdd></DboardExpenseAdd></div>

        {/* <div></div> */}

      </div>
    
    </div>
  )
}