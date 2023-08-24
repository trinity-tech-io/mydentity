import { ReactNode } from "react";

export type FAQItem = {
  title: string;
  content: ReactNode | string;
}

export type FAQGroup = {
  title: string;
  items: FAQItem[];
}