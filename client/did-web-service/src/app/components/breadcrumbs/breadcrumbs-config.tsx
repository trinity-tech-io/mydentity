import HomeIcon from '@assets/images/home.svg';
import SecurityIcon from '@assets/images/security-verified.svg';
import { BreadcrumbsItem } from "./Breadcrumbs";

export type BreadcrumbsEntry =
  "dashboard" |
  "profile" |
  "security-center" |
  "bind-browser";

export const allBreadcrumbsItems: BreadcrumbsItem[] = [
  { key: "dashboard", icon: <HomeIcon />, title: "Dashboard", path: "/dashboard" },
  { key: "profile", title: "Profile", path: '/profile' },
  { key: "security-center", icon: <SecurityIcon />, title: "Security center", path: '/account/security' },
  { key: "bind-browser", title: "Bind browser", path: '/account/security/bind-passkey' }
];

export function bcEntryToItem(entry: BreadcrumbsEntry): BreadcrumbsItem {
  const item = allBreadcrumbsItems.find(i => i.key === entry);
  if (!item)
    throw new Error(`Unknown breadcrumbs item ${entry}`);

  return item;
}