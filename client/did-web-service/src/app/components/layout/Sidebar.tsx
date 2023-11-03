/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next13-progressbar";
import { usePathname } from "next/navigation";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";
import { Box, Collapse, List, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

import AccountIcon from "@assets/images/account.svg";
import CardIcon from "@assets/images/card.svg";
import WidgetIcon from "@assets/images/widgets.svg";
import ActivityIcon from "@assets/images/activity.svg";
import ExploreIcon from "@assets/images/explore.svg";
import SupportIcon from "@assets/images/contact-support.svg";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { activeIdentity$ } from "@services/identity/identity.events";
import { authUser$ } from "@services/user/user.events";
import ThemeToggle from "../generic/ThemeToggle";
import { LandingCard } from "@components/card";
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
    title: "My Identities",
    url: "/identities",
    requiresAuth: true,
  },
  {
    icon: <AccountIcon />,
    title: "Identity",
    links: [
      { title: "My Profile", url: "/profile" },
      { title: "All Credentials", url: "/credentials/list" },
      { title: "Storage", url: "/storage" },
      { title: "Applications", url: "/applications" },
      { title: "Delete Identity", url: "/delete-identity" },
    ],
    requiresAuth: true,
    requiresActiveIdentity: true,
    openByDefault: true,
  },
  {
    icon: <ActivityIcon />,
    title: "Recent Activity",
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
    url: "/discover",
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
  closeSidebar: () => void;
}> = ({ link, sidebarExpanded, closeSidebar }) => {
  const pathname = usePathname();
  const isActive = link.url === pathname;

  return (
    <li>
      <Link
        href={link.url}
        className={clsx(
          "block transition duration-150 truncate",
          isActive ? "text-indigo-500" : "text-slate-400 hover:text-slate-200"
        )}
        onClick={() => {
          closeSidebar();
        }}
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
  closeSidebar: () => void;
  onGroupHeaderClicked: () => void;
}> = ({ group, closeSidebar, sidebarExpanded, onGroupHeaderClicked }) => {
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
    <MenuListItem
      className={clsx("rounded-md", links && "sub-menu", open && "open")}
    >
      <Link
        href={group.url || ""}
        className={clsx("truncate", isActive && "active")}
        onClick={(e) => {
          if (!group.url) e.preventDefault();
          else closeSidebar();
          setOpen(!open);
          onGroupHeaderClicked();
        }}
      >
        <div className="p-1 h-6 w-6">{icon}</div>
        <span
          className={clsx(
            "flex-1 text-base font-medium ml-3 lg:opacity-0 2xl:opacity-100",
            sidebarExpanded && "lg:!opacity-100"
          )}
        >
          {title}
        </span>
      </Link>
      {/* Inner links */}
      {links && (
        <Collapse in={open} timeout="auto">
          <div
            className={clsx(
              "lg:hidden 2xl:block",
              sidebarExpanded && "lg:!block"
            )}
          >
            <ul className="pl-9 mt-1">
              {links.map((link) => (
                <LinkElement
                  key={link.title}
                  link={link}
                  closeSidebar={closeSidebar}
                  sidebarExpanded={sidebarExpanded}
                />
              ))}
            </ul>
          </div>
        </Collapse>
      )}
    </MenuListItem>
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
  const router = useRouter();
  const [swiper, setSwiper] = useState(null);
  const slideTo = (index: number) => swiper?.slideTo(index);

  useEffect(() => {
    if (identities && identities?.length !== myIdentities.length) {
      const tempIdentities = [...identities];
      if (activeIdentity) {
        const activeIdentityIndex =
          identities?.findIndex((i) => i == activeIdentity) || activeIndex;
        if (activeIndex != activeIdentityIndex)
          tempIdentities.splice(
            activeIndex,
            0,
            tempIdentities.splice(activeIdentityIndex, 1)[0]
          );
      }
      setMyIdentites(tempIdentities);
    }

    if (identities?.length === myIdentities.length && activeIdentity) {
      let activeIdentityIndex = myIdentities?.findIndex(
        (i) => i == activeIdentity
      );
      if (activeIdentityIndex < 0) activeIdentityIndex = activeIndex;
      if (activeIndex != activeIdentityIndex) slideTo(activeIdentityIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleClick = (sw: SwiperClass) => {
    router.push("/profile");
  };

  return !identities ? (
    <LandingCard className="bg-black w-full" waveIconVisible={false} />
  ) : (
    <Box
      sx={{
        ".swiper-pagination": {
          bottom: 0,
          transform: "translateY(60%)",
        },
        "--swiper-pagination-color": "#C4C4C4",
      }}
    >
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Pagination]}
        className="mySwiper w-full"
        onTransitionEnd={handleTransitionEnd}
        onClick={handleClick}
        onSwiper={setSwiper}
        pagination={{
          clickable: true,
        }}
      >
        {myIdentities.map((identity, _id) => (
          <SwiperSlide key={_id}>
            <IdentityInfoCard identity={identity} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

const MenuList = styled(List)(({ theme }) => ({
  "&.collapsed > li.sub-menu > a:after": {
    content: "''",
    width: 5,
    height: 5,
    backgroundColor: "currentcolor",
    borderRadius: "50%",
    display: "inline-block",
    position: "absolute",
    right: 10,
    top: "50%",
    border: "none",
    transform: "translateY(-50%)",
  },
  li: {},
}));

const MenuListItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  display: "block",
  marginTop: 4,
  "--primary-color": theme.palette.mode == "dark" ? "#43464c80" : "#7a3cff",
  "--tran": "all 0.3s ease",
  transition: "var(--tran)",
  "&>a": {
    filter: "opacity(0.7)",
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: 6,
    color: theme.palette.mode == "dark" ? "#EEE" : "#121212",
    "&:hover, &:active, &:focus": {
      backgroundColor: "var(--primary-color)",
      filter: "none",
    }
  },
  "a:hover, a.active": {
    filter: "none",
  },
  "&.sub-menu": {
    ul: {
      position: "relative",
      li: {
        padding: "4px 12px",
      },
      "&:after": {
        content: "''",
        background: "#8080806B",
        left: 24,
        position: "absolute",
        top: 8,
        bottom: 8,
        width: 1,
      },
    },
  },
  "&.sub-menu > a:after": {
    content: "''",
    transition: "transform 0.3s",
    borderRight: "2px solid currentcolor",
    borderBottom: "2px solid currentcolor",
    width: 8,
    height: 8,
    transform: "rotate(-45deg)",
  },
  "&.sub-menu.open > a": {
    filter: "none",
    "&:after": {
      transform: "rotate(45deg)",
    },
  },
}));

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
      closeSidebar();
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (!sidebarOpen || e.keyCode !== 27) return;
      closeSidebar();
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const closeSidebar = (): void => {
    setSidebarOpen(false);
  };

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

        {/* Links */}
        <MenuList>
          {/* Link groups */}
          {groups.map((group) => (
            <GroupElement
              key={group.title}
              group={group}
              sidebarExpanded={sidebarExpanded}
              closeSidebar={closeSidebar}
              onGroupHeaderClicked={() => {
                if (!sidebarExpanded) setSidebarExpanded(true);
              }}
            />
          ))}
        </MenuList>
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
