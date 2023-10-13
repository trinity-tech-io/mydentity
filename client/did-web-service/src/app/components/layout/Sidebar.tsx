/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

import AccountIcon from "@assets/images/account.svg";
import CardIcon from "@assets/images/card.svg";
import WidgetIcon from "@assets/images/widgets.svg";
import DashboardIcon from "@assets/images/dashboard.svg";
import ExploreIcon from "@assets/images/explore.svg";
import SupportIcon from "@assets/images/contact-support.svg";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { activeIdentity$ } from "@services/identity/identity.events";
import { authUser$ } from "@services/user/user.events";
import ThemeToggle from "../generic/ThemeToggle";
import { LandingCard } from "@components/card";
import { Typography } from "@mui/material";
import { IdentityInfoCard } from "@components/identity/IdentityInfoCard";
import { identityService } from "@services/identity/identity.service";
import { RegularIdentity } from "@model/regular-identity/regular-identity";

type LinkConfig = {
  title: string;
  url: string;
};

type GroupConfig = {
  icon: ReactNode;
  title: string;
  url?: string;
  links?: LinkConfig[];
  requiresAuth?: boolean; // This link group will be shown only if user is signed in
  requiresActiveIdentity?: boolean; // This link gorup will show only if there is an active identity
  openByDefault?: boolean; // Whether the group is open by default or not
};

const groups: GroupConfig[] = [
  {
    icon: <WidgetIcon />,
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    icon: <CardIcon />,
    title: "My identities",
    url: "/identities",
    requiresAuth: true,
  },
  {
    icon: <AccountIcon />,
    title: "Active identity",
    links: [
      { title: "My profile", url: "/profile" },
      { title: "All credentials", url: "/credentials/list" },
      { title: "Storage", url: "/storage" },
      { title: "Applications", url: "/applications" },
      { title: "Delete identity", url: "/delete-identity" },
    ],
    requiresAuth: true,
    requiresActiveIdentity: true,
    openByDefault: true,
  },
  {
    icon: <DashboardIcon />,
    title: "Recent activity",
    url: "/recent-activity",
    requiresAuth: true,
  },
  /* {
    icon: <MarketplaceIcon />,
    title: "Hub",
    links: [
      { title: "Get more credentials", url: "/marketplace" }
    ]
  },
  {
    icon: <LearnIcon />,
    title: "Learn",
    links: [
      { title: "DIDs", url: "/learn/dids" },
      { title: "Credentials", url: "/learn/credentials " }
    ]
  },
  {
    icon: <ManageIcon />,
    title: "Manage",
    links: [
      { title: "Export", url: "/manage/export" },
    ]
  }, */
  {
    icon: <ExploreIcon />,
    title: "Discover",
    links: [
      { title: "Essentials identity wallet", url: "/discover/essentials" },
      { title: "Elastos Web3 Tech", url: "/discover/elastos" },
      { title: "Trinity Tech", url: "/discover/trinity-tech" },
    ],
  },
  {
    icon: <SupportIcon />,
    title: "Support",
    links: [
      { title: "FAQ", url: "/support/faq" },
      { title: "Contact us", url: "/support/contact" },
      //{ title: "Developers", url: "/support/developers" },
    ],
  },
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
        className={clsx(
          "block transition duration-150 truncate",
          isActive ? "text-indigo-500" : "text-slate-400 hover:text-slate-200"
        )}
      >
        <span
          className={clsx(
            "text-sm font-medium lg:opacity-0 2xl:opacity-100 duration-200",
            sidebarExpanded && "lg:opacity-100"
          )}
        >
          {link.title}
        </span>
      </Link>
    </li>
  );
};

const GroupElement: FC<{
  group: GroupConfig;
  sidebarExpanded: boolean;
  onGroupHeaderClicked: () => void;
}> = ({ group, sidebarExpanded, onGroupHeaderClicked }) => {
  const {
    icon,
    title,
    links,
    requiresAuth = false,
    requiresActiveIdentity = false,
    openByDefault = false,
  } = group;
  const pathname = usePathname();
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const isActive =
    group.url === pathname || group.links?.some((l) => l.url === pathname);
  const [open, setOpen] = useState(openByDefault);
  const [authUser] = useBehaviorSubject(authUser$);
  const { mounted } = useMounted();

  if (requiresAuth && (!authUser || !mounted))
    // render server and client without this item until we know more about "authUser"
    return null;

  if (requiresActiveIdentity && (!activeIdentity || !mounted)) return null;

  return (
    <div>
      <ul className="">
        <li
          className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
            isActive && "bg-stone-900"
          }`}
        >
          <Link
            href={group.url || ""}
            className={`block text-[#ddd] truncate transition duration-150 ${
              isActive ? "hover:text-slate-200" : "hover:text-white"
            }`}
            onClick={(e) => {
              if (!group.url) e.preventDefault();

              setOpen(!open);
              onGroupHeaderClicked();
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-1 h-6 w-6">{icon}</div>
                <span
                  className={clsx(
                    "text-base font-medium ml-3 lg:opacity-0 2xl:opacity-100 duration-200",
                    sidebarExpanded && "lg:!opacity-100"
                  )}
                >
                  {title}
                </span>
              </div>
              {links && (
                <div className="flex shrink-0 ml-2">
                  <svg
                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                      open && "rotate-180"
                    }`}
                    viewBox="0 0 12 12"
                  >
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </div>
              )}
            </div>
          </Link>
          {/* Inner links */}
          {links && (
            <div
              className={clsx(
                "lg:hidden 2xl:block",
                sidebarExpanded && "lg:!block"
              )}
            >
              <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                {links.map((link) => (
                  <LinkElement
                    key={link.title}
                    link={link}
                    sidebarExpanded={sidebarExpanded}
                  />
                ))}
              </ul>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

const IdentityCardGroup: FC = () => {
  const [authUser] = useBehaviorSubject(authUser$);
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [identities] = useBehaviorSubject(
    authUser?.get("identity").regularIdentities$
  );
  const [myIdentities, setMyIdentites] = useState<RegularIdentity[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (identities && identities?.length !== myIdentities.length && activeIdentity) {
      const tempIdentities = [...identities];
      const activeIdentityIndex =
        identities?.findIndex((i) => i == activeIdentity) || activeIndex;
      if (activeIndex != activeIdentityIndex)
        tempIdentities.splice(
          activeIndex,
          0,
          tempIdentities.splice(activeIdentityIndex, 1)[0]
        );
      setMyIdentites(tempIdentities);
    }
  }, [identities?.length, activeIdentity]);

  // const sortedIdentities =
  //   identities &&
  //   [...identities].sort((a, b) => {
  //     const dateA = a.lastUsedAt$.getValue().getTime();
  //     const dateB = b.lastUsedAt$.getValue().getTime();
  //     return dateB - dateA;
  //   });

  const handleTransitionEnd = (sw: SwiperClass) => {
    identityService.setActiveIdentity(myIdentities[sw.activeIndex]);
    setActiveIndex(sw.activeIndex);
  };

  return !identities ? (
    <LandingCard
      className="bg-black w-full"
      waveIconVisible={false}
    />
  ) : (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="mySwiper w-full"
      onTransitionEnd={handleTransitionEnd}
    >
      {myIdentities.map((identity, _id) => (
        <SwiperSlide key={_id}>
          <IdentityInfoCard identity={identity} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

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
      if (
        !sidebarOpen ||
        sidebar.current.contains(e.target) ||
        trigger.current.contains(e.target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (!sidebarOpen || e.keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={clsx(
          "flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 2xl:!w-64 shrink-0 bg-[#292B29] p-4 transition-all duration-200 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-64",
          sidebarExpanded && "lg:!w-64"
        )}
      >
        {/* Sidebar header */}
        <IdentityCardGroup />
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            {/* hide Close sidebar button */}
            {/* <span className="sr-only">Close sidebar</span> */}
            {/* <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg> */}
          </button>
        </div>

        {/* <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white mb-4" onClick={createDIDTest}>
          <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span className="hidden xs:block ml-2">Test New DID</span>
        </button> */}

        {/* Links */}
        <div /* className="space-y-8" */>
          {/* Link groups */}
          {groups.map((group) => (
            <GroupElement
              key={group.title}
              group={group}
              sidebarExpanded={sidebarExpanded}
              onGroupHeaderClicked={() => {
                if (!sidebarExpanded) setSidebarExpanded(true);
              }}
            />
          ))}
        </div>
        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className={clsx(
                  "w-6 h-6 fill-current",
                  sidebarExpanded && "rotate-180"
                )}
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
        {/*Toggle Theme: light/dark */}
        {/* <div className='px-3 py-2'><ThemeToggle /></div> */}
      </div>
    </div>
  );
};

export default Sidebar;
