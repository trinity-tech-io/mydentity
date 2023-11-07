/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";
import { FC, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next13-progressbar";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";
import { Box, Stack } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { activeIdentity$ } from "@services/identity/identity.events";
import { authUser$ } from "@services/user/user.events";
import { LandingCard } from "@components/card";
import { IdentityInfoCard } from "@components/identity/IdentityInfoCard";
import { identityService } from "@services/identity/identity.service";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import SidebarMenu from "./components/SidebarMenu";

const IdentityCardGroup: FC<{ visiblePagination: boolean }> = ({
  visiblePagination,
}) => {
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
          bottom: -5,
          transform: "translateY(60%)",
        },
        "--swiper-pagination-color": (theme) =>
          theme.palette.mode === "dark" ? "#C4C4C4" : "#202020",
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
        pagination={
          visiblePagination && {
            clickable: true,
          }
        }
      >
        {myIdentities.map((identity, _id) => (
          <SwiperSlide
            key={_id}
            style={{ display: "flex", borderRadius: "6.329%/10%" }}
          >
            <IdentityInfoCard identity={identity} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
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
      <Stack
        id="sidebar"
        ref={sidebar}
        className={clsx(
          "z-40 h-screen overflow-y-auto no-scrollbar w-64 lg:w-20 2xl:!w-64 shrink-0 bg-[#292B29] p-4 transition-all duration-200 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-64",
          sidebarExpanded && "lg:!w-64"
        )}
        sx={{
          position: { xs: "absolute", md: "static" },
          left: { md: "auto" },
          top: { md: "auto" },
          transform: { md: "translateX(0)" },
          background: (theme) =>
            theme.palette.mode === "dark" ? "#292B29" : "#F1F1F1",
        }}
      >
        {/* Sidebar header */}
        <IdentityCardGroup visiblePagination={sidebarExpanded} />
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
        <SidebarMenu
          sidebarExpanded={sidebarExpanded}
          closeSidebar={closeSidebar}
          handleClickGroupHeader={(): void => {
            if (!sidebarExpanded) setSidebarExpanded(true);
          }}
        />

        {/* Expand / collapse button */}
        <div className="flex pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
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
      </Stack>
    </div>
  );
};

export default Sidebar;
