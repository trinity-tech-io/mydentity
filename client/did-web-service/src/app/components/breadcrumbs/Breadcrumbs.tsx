import Link from 'next/link';
import { FC } from "react";
import { BreadcrumbsEntry, bcEntryToItem } from './breadcrumbs-config';

export type BreadcrumbsItem = {
  key: BreadcrumbsEntry;
  icon?: JSX.Element; // Optional icon shown before the title
  title: string; // Displayed title
  path?: string; // react router url
}

const BreadcrumbsElement: FC<{
  item: BreadcrumbsItem;
}> = ({ item }) => {
  const { icon, title, path } = item;

  return (
    <div className="flex flex-row items-center justify-center">
      {icon && <div className='mr-1' style={{ width: 18, height: 18, color: "var(--primary-color)" }}>{icon}</div>}
      {path && <Link href={path} className=' bg-gray-200 px-3 py-1 rounded-lg' style={{ fontSize: 14 }}>{title}</Link>}
      {!path && <div>{title}</div>}
    </div >
  )
}

const Separator: FC = () => {
  return <div className='mx-2'>/</div>
}

export const Breadcrumbs: FC<{ entries: BreadcrumbsEntry[] }> = ({ entries }) => {
  const dashboardItem = bcEntryToItem("dashboard");
  const items = [dashboardItem, ...entries.map(e => bcEntryToItem(e))];

  return (
    <div className="flex flex-row items-center w-full justify-center">
      {items.map((item, i) => (
        <div className="flex flex-row items-center" key={i} >
          <BreadcrumbsElement item={item} />
          {i < items.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}