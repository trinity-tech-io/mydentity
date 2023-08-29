'use client'
import AccountIcon from '@assets/images/account.svg';
import DashboardIcon from '@assets/images/dashboard.svg';
import DiscoverIcon from '@assets/images/discover.svg';
import LearnIcon from '@assets/images/learn.svg';
import ManageIcon from '@assets/images/manage.svg';
import MarketplaceIcon from '@assets/images/marketplace.svg';
import SupportIcon from '@assets/images/support.svg';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { activeIdentity$ } from '@services/identity/identity.events';
import { shortenDID } from '@services/identity/identity.utils';
import { authUser$ } from '@services/user/user.events';
import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import ThemeToggle from '../components/generic/ThemeToggle';

type LinkConfig = {
  title: string;
  url: string;
}

type GroupConfig = {
  icon: StaticImageData;
  title: string;
  url?: string;
  links?: LinkConfig[];
  requiresAuth?: boolean; // This link group will be shown only if user is signed in
}

const groups: GroupConfig[] = [
  {
    icon: DashboardIcon,
    title: "Dashboard",
    url: "/dashboard"
  },
  {
    icon: AccountIcon,
    title: "Profile",
    links: [
      { title: "My profile", url: "/profile" },
      { title: "All credentials", url: "/credentials/list" }
    ],
    requiresAuth: true
  },
  {
    icon: MarketplaceIcon,
    title: "Hub",
    links: [
      { title: "Get more credentials", url: "/marketplace" }
    ]
  },
  {
    icon: LearnIcon,
    title: "Learn",
    links: [
      { title: "DIDs", url: "/learn/dids" },
      { title: "Credentials", url: "/learn/credentials " }
    ]
  },
  {
    icon: ManageIcon,
    title: "Manage",
    links: [
      { title: "Export", url: "/manage/export" },
      { title: "Delete this identity", url: "/manage/delete" }
    ]
  },
  {
    icon: DiscoverIcon,
    title: "Discover",
    links: [
      { title: "Essentials identity wallet", url: "/discover/essentials" },
      { title: "Elastos Web3 Tech", url: "/discover/elastos" },
      { title: "Trinity Tech", url: "/discover/trinity-tech" }
    ]
  },
  {
    icon: SupportIcon,
    title: "Support",
    links: [
      { title: "FAQ", url: "/support/faq" },
      { title: "Contact us", url: "/support/contact" },
      //{ title: "Developers", url: "/support/developers" },
    ]
  }
];

const LinkElement: FC<{
  link: LinkConfig;
  sidebarExpanded: boolean;
}> = ({ link, sidebarExpanded }) => {
  const pathname = usePathname();
  const isActive = link.url === pathname;

  return (
    <li className="mb-1 last:mb-0">
      <Link
        href={link.url}
        className={clsx('block transition duration-150 truncate', isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')}>
        <span className={clsx("text-sm font-medium lg:opacity-0 2xl:opacity-100 duration-200", sidebarExpanded && "lg:opacity-100")}>
          {link.title}
        </span>
      </Link>
    </li>
  )
}

const GroupElement: FC<{
  group: GroupConfig;
  sidebarExpanded: boolean;
  onGroupHeaderClicked: () => void;
}> = ({ group, sidebarExpanded, onGroupHeaderClicked }) => {
  const { icon, title, links, requiresAuth = false } = group;
  const pathname = usePathname();
  const isActive = group.url === pathname || group.links?.some(l => l.url === pathname);
  const [open, setOpen] = useState(isActive);
  const [authUser] = useBehaviorSubject(authUser$());
  const { mounted } = useMounted();

  if ((requiresAuth && (!authUser || !mounted))) // render server and client without this item until we know more about "authUser"
    return null;

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
                <span className={clsx("text-sm font-medium ml-3 lg:opacity-0 2xl:opacity-100 duration-200", sidebarExpanded && "lg:!opacity-100")}>
                  {title}
                </span>
              </div>
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
            links && <div className={clsx("lg:hidden 2xl:block", sidebarExpanded && "lg:!block")}>
              <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                {links.map(link => <LinkElement key={link.title} link={link} sidebarExpanded={sidebarExpanded} />)}
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
  let [activeIdentity] = useBehaviorSubject(activeIdentity$);

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

  /* useEffect(() => {
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]); */

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
        className={clsx("flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out", sidebarOpen ? 'translate-x-0' : '-translate-x-64', sidebarExpanded && "lg:!w-64")}
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

          {/* Top Logo */}
          <Link href="/" className="block">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z" fill="#4F46E5" />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
          </Link>
        </div>

        {/* <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white mb-4" onClick={createDIDTest}>
          <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span className="hidden xs:block ml-2">Test New DID</span>
        </button> */}

        {activeIdentity && <>
          <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
            <span className={clsx("hidden lg:block 2xl:hidden text-center w-6", sidebarExpanded && "lg:hidden")} aria-hidden="true">
              •••
            </span>
            <span className={clsx("lg:hidden 2xl:block", sidebarExpanded && "lg:!block")}>ACTIVE IDENTITY</span>
          </h3>
          <span className={clsx("lg:hidden 2xl:block text-slate-200 mx-3 mb-6", sidebarExpanded && "lg:!block")} style={{ fontSize: 11 }}>{shortenDID(activeIdentity.did)}</span>
        </>
        }

        {/* Links */}
        <div /* className="space-y-8" */>
          {/* Link groups */}
          {groups.map(group => <GroupElement
            key={group.title}
            group={group}
            sidebarExpanded={sidebarExpanded}
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
              <svg className={clsx("w-6 h-6 fill-current", sidebarExpanded && "rotate-180")} viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
        <div className='px-3 py-2'><ThemeToggle /></div>
      </div>
    </div>
  );
}

export default Sidebar;
