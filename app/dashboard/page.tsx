import DBoardIntro from "../components/dashboard/DBoardIntro";
import DboardLatestTransaction from "../components/dashboard/DboardLatestTransaction";
import DBoardQuickStats from "../components/dashboard/DBoardQuickStats";





export default function page() {
  return (
    <div className="w-[95%] max-w-400 mx-auto my-5   ">
      <div>
        

        <div className="flex flex-col  justify-between  gap-5 md:gap-8">

          <div><DBoardIntro></DBoardIntro></div>

          <div><DBoardQuickStats></DBoardQuickStats></div>

          <div><DboardLatestTransaction></DboardLatestTransaction></div>
        </div>


      </div>
    </div>
  )
}