/* eslint-disable @typescript-eslint/explicit-function-return-type */
"use client";
import { FC, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next13-progressbar";
import Transition from "@components/generic/Transition";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Divider,
  Link,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { authUser$ } from "@services/user/user.events";
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
  const [boundEmails] = useBehaviorSubject(
    activeUser?.get("email").userEmails$
  );
  const [passkeys] = useBehaviorSubject(
    activeUser?.get("security").passkeyKeys$
  );
  let userDesc = "Checking status...";
  if (boundEmails && passkeys) {
    if (boundEmails.length) userDesc = boundEmails[0].email;
    else if (passkeys.length) userDesc = passkeys[0].browser.name;
    else userDesc = "";
  }

  // get access token from url params.
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  const dropdown = useRef(null);

  const openSecurityCenter = (): void => {
    router.push("/account/security");
    setDropdownOpen(!dropdownOpen);
  };

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
          className="origin-top-right z-10 absolute top-full min-w-[12rem] right-0"
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
                {userDesc ? (
                  <Typography
                    variant="caption"
                    className="opacity-80"
                    fontSize="9pt"
                  >
                    {userDesc}
                  </Typography>
                ) : (
                  <Link
                    component="button"
                    onClick={openSecurityCenter}
                    underline="hover"
                    lineHeight={1}
                    textAlign="left"
                    color="error"
                  >
                    <Typography
                      variant="caption"
                      className="text-[#EA4335]"
                      lineHeight={1}
                      fontSize="8.5pt"
                    >
                      Cannot sign in if signing out. Check security center
                    </Typography>
                  </Link>
                )}
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
                  <Typography variant="body1" className="opacity-90">
                    {m.name}
                  </Typography>
                </MenuItem>
              ))}
            </Paper>
          </div>
        </Transition>
      )}
    </div>
  );
};
