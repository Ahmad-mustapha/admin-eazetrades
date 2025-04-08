import Image from "next/image";
import Iconimg from '../../public/circle.png'
import { InteractivePieChart } from "../chart/pie-chart";
import StatsDisplay from "./Statsdisplay";
import ProductTable from "../tables/Products";
import ServiceTable from "../tables/Services";
import PremiumproductTable from "../tables/Premiumproducts";
import VipproductTable from "../tables/Vipproducts";
// Dummy data - replace values with your actual mock data
const dummyStats = {
  total_users: 1243,
  unverified_users: 57,
  verified_users: 1186,
  total_staffs: 42,
  pending_users: 23
}

const userData = [
  { id: 1, title: 'Total Users', image: Iconimg, key: 'total_users' },
  { id: 2, title: 'Unverified Users', image: Iconimg, key: 'unverified_users' },
  { id: 3, title: 'Verified Users', image: Iconimg, key: 'verified_users' },
  { id: 4, title: 'Total Staffs', image: Iconimg, key: 'total_staffs' },
  // { id: 5, title: 'Pending', image: Iconimg, key: 'pending_users' }
]

const Dashboardstat = () => {
  return (
    <div className="py-10">
      <div className='flex items-center gap-6 overflow-x-auto xl:justify-start'>
        {userData.map((data) => (
          <div key={data.id} className='min-w-[12rem] h-[110px] lg:min-w-[14rem] xl:w-full flex items-center gap-4 bg-white p-4 rounded-xl'>
            <div className='p-2 rounded-xl'
              // style={{
              //   backgroundColor:
              //     data.title === "Total Users"
              //       ? "rgba(56, 101, 215, 0.16)"
              //       : data.title === "Verified Users"
              //       ? "rgba(224, 254, 233)"
              //       : data.title === "Unverified Users"pie
              //       ? "rgba(231, 77, 60, 0.16)"
              //       : "rgba(255, 193, 7, 0.16)" // Default color for staff/pending
              // }}
            >
              <Image src={data.image} alt={data.title} className="w-10 h-10" />
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-[.85rem] text-[#64748B]'>{data.title}</p>
              <p className='text-[1.1rem] font-[700]'>
                {dummyStats[data.key as keyof typeof dummyStats] || 0}
              </p>
            </div>
          </div>
        ))}
      </div>
      <section className="rounded-lg bg-white my-16 flex flex-wrap md:flex-nowrap">
        <div className="w-5/6 md:w-3/6"><InteractivePieChart /></div>
        <div className="w-5/6 md:w-3/6"><StatsDisplay /></div>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-auto">
        <ProductTable />
        <ServiceTable />
        <PremiumproductTable />
        <VipproductTable />
      </section>
    </div>
  )
}

export default Dashboardstat