/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";
import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next13-progressbar";
import Transition from "@components/generic/Transition";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { User } from "@model/user/user";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { authUser$, getActiveUser } from "@services/user/user.events";
import { signOut } from "@services/user/user.service";
import IdentityCaseIcon from "@assets/images/identity-case.svg";

export const DropdownUserProfile: FC<{
  align: "left" | "right";
}> = ({ align }) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeUser] = useBehaviorSubject(authUser$);
  const isSignedIn = !!activeUser;
  const [userName] = useBehaviorSubject(activeUser?.name$);
  const [userTypeDesc, setUserTypeDesc] = useState("UNKNOWN");

  // get access token from url params.
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  const dropdown = useRef(null);

  const onSignOut = () => {
    signOut();
    router.push("/dashboard");
  };

  const ProfileMenuItems = [
    { name: "Account profile", link: "/account/profile" },
    { name: "Security center", link: "/account/security" },
    { name: "Developers zone", link: "/developers" },
    { name: "Export", link: "/account/export" },
    { name: "Sign out", action: onSignOut },
  ];
  // close on click outside
  useEffect(() => {
    const updateUserDesc = (user: User) => {
      if (user.type === "MICROSOFT") {
        setUserTypeDesc("Microsoft");
      } else if (user.type === "EMAIL") {
        setUserTypeDesc("Email");
      }
      // setUserName(user.email);
    };

    const user = getActiveUser();
    if (user) {
      updateUserDesc(user);
    }

    const clickHandler: (ev: MouseEvent) => void = ({ target }) => {
      if (
        !dropdown.current ||
        !dropdownOpen ||
        dropdown.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [accessToken, dropdownOpen, refreshToken]);

  const onIconClick = () => {
    if (!isSignedIn) {
      // setSignInOpen(!signInOpen);
      window.location.href = "/signin";
    } else {
      setDropdownOpen(!dropdownOpen);
    }
  };

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler: (ev: KeyboardEvent) => void = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <ListItemButton onClick={() => onIconClick()}>
        <ListItemIcon>
          <Avatar sx={{ padding: "0.5rem", bgcolor: "#9D3E3E", color: "#DDD" }}>
            <IdentityCaseIcon />
          </Avatar>
        </ListItemIcon>
        <ListItemText
          primary={
            <span className="text-base font-medium">Hi {userName}!</span>
          }
        />
        {dropdownOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {isSignedIn && (
        <Transition
          // className={`origin-top-right z-10 absolute top-full min-w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
          className="origin-top-right z-10 absolute top-full min-w-44 right-0"
          show={dropdownOpen}
          enter="transition ease-out duration-200 transform"
          enterStart="opacity-0 -translate-y-2"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveStart="opacity-100"
          leaveEnd="opacity-0"
        >
          <div
            ref={dropdown}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
          >
            <Paper
              variant="outlined"
              sx={{ borderRadius: "0.5rem", py: "0.75rem" }}
            >
              <Box sx={{ px: "1.25rem" }}>
                <Typography variant="body1" fontWeight={600}>
                  You’re signed in!
                </Typography>
                <Typography variant="caption" className="opacity-80">
                  {userTypeDesc} user
                </Typography>
              </Box>
              <Divider sx={{ my: ".5rem" }} />
              {ProfileMenuItems.map((m, _id) => (
                <MenuItem
                  key={_id}
                  sx={{ px: "1.25rem" }}
                  onClick={() => {
                    m.link && router.push(m.link);
                    setDropdownOpen(!dropdownOpen);
                    m.action && m.action();
                  }}
                >
                  <Typography variant="body2">{m.name}</Typography>
                </MenuItem>
              ))}
            </Paper>
          </div>
        </Transition>
      )}
    </div>
  );
};
