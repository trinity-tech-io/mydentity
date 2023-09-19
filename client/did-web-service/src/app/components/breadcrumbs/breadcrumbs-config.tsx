import HomeIcon from '@assets/images/home.svg';
import SecurityIcon from '@assets/images/security-verified.svg';
import { BreadcrumbsItem } from "./Breadcrumbs";

export type BreadcrumbsEntry =
  "dashboard" |
  "profile" |
  "account-profile" |
  "security-center" |
  "bind-browser" |
  "bind-email" |
  "bind-password" |
  "credentials-list" |
  "delete-identity" |
  "storage" |
  "applications";

export const allBreadcrumbsItems: BreadcrumbsItem[] = [
  { key: "dashboard", icon: <HomeIcon />, title: "Dashboard", path: "/dashboard" },
  { key: "profile", title: "Profile", path: '/profile' },
  { key: "account-profile", title: "Account profile", path: '/account/profile' },
  { key: "security-center", icon: <SecurityIcon />, title: "Security center", path: '/account/security' },
  { key: "bind-browser", title: "Bind browser", path: '/account/security/bind-passkey' },
  { key: "bind-email", title: "Bind email", path: '/account/security/bind-email' },
  { key: "bind-password", title: "Bind password", path: '/account/security/bind-password' },
  { key: "credentials-list", title: "All credentials", path: '/account/credentials/list' },
  { key: "delete-identity", title: "Identity deletion", path: '/delete-identity' },
  { key: "storage", title: "Storage", path: '/storage' },
  { key: "applications", title: "Applications", path: '/applications' },
];

export function bcEntryToItem(entry: BreadcrumbsEntry): BreadcrumbsItem {
  const item = allBreadcrumbsItems.find(i => i.key === entry);
  if (!item)
    throw new Error(`Unknown breadcrumbs item ${entry}`);

  return item;
}