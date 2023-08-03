'use client'
import { Datepicker } from '@components/Datepicker';
import FilterButton from '@components/DropdownFilter';
import { FC } from "react";
import { WelcomeBanner } from "./WelcomeBanner";
import { IdentityListWidget } from "./widgets/IdentityList";
import { RecentActivityWidget } from "./widgets/RecentActivity";

const Dashboard: FC = () => {
  return (<>

    {/* Top part */}
    <div className="col-span-full">
      {/* Welcome banner */}
      <WelcomeBanner />

      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Filter button */}
          <FilterButton align="left" />
          {/* Datepicker built with flatpickr */}
          <Datepicker />
          {/* Add view button */}
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Add view</span>
          </button>
        </div>
      </div>
    </div>

    {/* Widgets */}
    <RecentActivityWidget />
    <IdentityListWidget />
  </>)
}

export default Dashboard;