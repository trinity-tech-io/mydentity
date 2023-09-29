'use client'
import AccountIcon from '@assets/images/account.svg';
import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';

type LinkConfig = {
  title: string;
  url: string;
}

type GroupConfig = {
  icon: StaticImageData;
  title: string;
  url?: string;
  links?: LinkConfig[];
}

const groups: GroupConfig[] = [
  {
    icon: AccountIcon,
    title: "DID Web service",
    links: [
      { title: "DID auth", url: "/didweb/auth" },
      { title: "Donation demo", url: "/didweb/donation-demo" },
    ]
  },
  {
    icon: AccountIcon,
    title: "Essentials",
    links: [
      { title: "DID auth", url: "/essentials/auth" },
    ]
  },
];

const LinkElement: FC<{
  link: LinkConfig;
}> = ({ link }) => {
  const pathname = usePathname();
  const isActive = link.url === pathname;

  return (
    <li className="mb-1 last:mb-0">
      <Link
        href={link.url}
        className={clsx('block transition duration-150 truncate', isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')}>
        <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
          {link.title}
        </span>
      </Link>
    </li>
  )
}

const GroupElement: FC<{
  group: GroupConfig;
  onGroupHeaderClicked: () => void;
}> = ({ group, onGroupHeaderClicked }) => {
  const { icon, title, links } = group;
  const pathname = usePathname();
  const isActive = group.url === pathname || group.links?.some(l => l.url === pathname);
  const [open, setOpen] = useState(isActive);

  return (
    <div>
      <ul className="">
        <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${isActive && 'bg-slate-900'}`}>
          <Link
            href={group.url || ""}
            className={`block text-slate-200 truncate transition duration-150 ${isActive ? 'hover:text-slate-200' : 'hover:text-white'
              }`}
            onClick={(e) => {
              if (!group.url)
                e.preventDefault();

              setOpen(!open);
              onGroupHeaderClicked();
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image src={icon} alt="" className='shrink-0 h-6 w-6' />
                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  {title}
                </span>
              </div>
              {/* Icon */}
              {links &&
                <div className="flex shrink-0 ml-2">
                  <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </div>
              }
            </div>
          </Link>
          {/* Inner links */}
          {
            links && <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
              <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                {links.map(link => <LinkElement key={link.title} link={link} />)}
              </ul>
            </div>
          }
        </li>
      </ul>
    </div>
  )
}

const Sidebar: FC<{
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}> = ({ sidebarOpen, setSidebarOpen }) => {
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // close on click outside
  useEffect(() => {
    const clickHandler: EventListener = (e) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(e.target) || trigger.current.contains(e.target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (!sidebarOpen || e.keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'
          }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
        </div>

        <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
          <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
            •••
          </span>
          <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">TESTS LIST</span>
        </h3>

        {/* Links */}
        <div /* className="space-y-8" */>

          {/* Link groups */}
          {groups.map(group => <GroupElement
            key={group.title}
            group={group}
            onGroupHeaderClicked={() => {
              if (!sidebarExpanded)
                setSidebarExpanded(true);
            }}
          />)}
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
