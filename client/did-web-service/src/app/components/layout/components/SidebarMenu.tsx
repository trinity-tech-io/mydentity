import { FC, ReactNode, useState, MouseEventHandler, useRef } from "react";
import clsx from "clsx";
import { styled } from "@mui/material/styles";
import {
  Collapse,
  Fade,
  List,
  ListItem,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AccountIcon from "@assets/images/account.svg";
import CardIcon from "@assets/images/card.svg";
import WidgetIcon from "@assets/images/widgets.svg";
import ActivityIcon from "@assets/images/activity.svg";
import ExploreIcon from "@assets/images/explore.svg";
import SupportIcon from "@assets/images/contact-support.svg";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { authUser$ } from "@services/user/user.events";
import ArrowPopper from "@components/popup/ArrowPopper";
import { activeIdentity$ } from "@services/identity/identity.events";

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
      { title: "Credentials", url: "/credentials/list" },
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

const LinkElement: FC<{
  link: LinkConfig;
  sidebarExpanded: boolean;
  closeSidebar: () => void;
}> = ({ link, sidebarExpanded, closeSidebar }) => {
  const pathname = usePathname();
  const isActive = link.url === pathname;

  return (
    <li className={clsx(isActive && "active")}>
      <Link
        href={link.url}
        className={clsx("block transition duration-150 truncate")}
        onClick={closeSidebar}
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
  const [onSubmenu, setOnSubmenu] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const [authUser] = useBehaviorSubject(authUser$);
  const { mounted } = useMounted();
  const menuRef = useRef(null);

  const handleEnter: MouseEventHandler = (e) => {
    if (!sidebarExpanded && links) {
      setOnSubmenu(true);
      setOpenSubmenu(true);
    }
  };

  const handleLeave: MouseEventHandler = () => {
    if (!sidebarExpanded) {
      setOnSubmenu(false);
      setOpenSubmenu(false);
    }
  };

  if (requiresAuth && (!authUser || !mounted))
    // render server and client without this item until we know more about "authUser"
    return null;

  if (requiresActiveIdentity && (!activeIdentity || !mounted)) return null;

  return (
    <MenuListItem
      ref={menuRef}
      className={clsx("rounded-md", links && "sub-menu", open && "open")}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={group.url || ""}
        className={clsx("truncate", isActive && "active")}
        onClick={(e): void => {
          if (!group.url) e.preventDefault();
          else closeSidebar();
          setOpen(!open);
          if (!sidebarExpanded) {
            setOnSubmenu(false);
            setOpenSubmenu(false);
          }
          onGroupHeaderClicked();
        }}
      >
        <div className="p-1 h-6 w-6 flex">{icon}</div>
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
      <ArrowPopper
        open={openSubmenu}
        anchorEl={menuRef?.current}
        transition
        placement="right-start"
        onMouseEnter={(e): void => {
          setOpenSubmenu(true);
        }}
        onMouseLeave={(e): void => {
          if (!onSubmenu) setOpenSubmenu(false);
        }}
        sx={{
          "&[data-popper-placement*='right'] .paper:before": {
            top: 13,
          },
        }}
      >
        {({ TransitionProps, placement }): ReactNode => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper className="paper" sx={{ p: 1 }}>
              <MenuList>
                {links.map(
                  (link, _id): ReactNode => (
                    <Link
                      href={link.url}
                      onClick={(): void => {
                        setOpenSubmenu(false);
                      }}
                      key={_id}
                    >
                      <MenuItem
                        selected={link.url === pathname}
                        sx={{
                          "&.Mui-selected, &:hover": { filter: "none" },
                          filter: "opacity(0.7)",
                        }}
                      >
                        <Typography variant="body2" color="text.primary">
                          {link.title}
                        </Typography>
                      </MenuItem>
                    </Link>
                  )
                )}
              </MenuList>
            </Paper>
          </Fade>
        )}
      </ArrowPopper>
    </MenuListItem>
  );
};

const MenuListItem = styled(ListItem)(({ theme }) => ({
  padding: 0,
  display: "block",
  marginTop: 4,
  "--prim-color": theme.palette.mode === "dark" ? "#43464c80" : "#fff",
  "--tran": "all 0.3s ease",
  transition: "var(--tran)",
  a: {
    filter: "opacity(0.65)",
    color: theme.palette.primary.main,
    "&:hover, &.active": {
      filter: "none",
    },
  },
  "&>a": {
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: 6,
    "&:hover, &.active, &:focus": {
      backgroundColor: "var(--prim-color)",
      filter: "none",
    },
  },
  "&.sub-menu": {
    ul: {
      position: "relative",
      li: {
        padding: "4px 12px",
        position: "relative",
        "a:focus": {
          filter: "none",
        },
        "&:hover, &.active, &:focus": {
          a: {
            filter: "none",
          },
          "&:after": {
            content: "''",
            background: "#808080",
            left: -15,
            transition: "all .2s ease-in-out",
            width: 7,
            height: 7,
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            borderRadius: "50%",
          },
        },
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

const SidebarMenu: FC<{
  sidebarExpanded: boolean;
  handleClickGroupHeader: () => void;
  closeSidebar: () => void;
}> = ({ sidebarExpanded, handleClickGroupHeader, closeSidebar }) => {
  return (
    <MenuList>
      {/* Link groups */}
      {groups.map((group) => (
        <GroupElement
          key={group.title}
          group={group}
          sidebarExpanded={sidebarExpanded}
          closeSidebar={closeSidebar}
        //   onGroupHeaderClicked={() => {
        //     if (!sidebarExpanded) setSidebarExpanded(true);
        //   }}
          onGroupHeaderClicked={handleClickGroupHeader}
        />
      ))}
    </MenuList>
  );
};

export default SidebarMenu;
