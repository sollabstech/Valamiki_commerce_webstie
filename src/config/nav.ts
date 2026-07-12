import type { LucideIcon } from "lucide-react";
import { NotebookPen, ShoppingBasket } from "lucide-react";

export type CategoryNav = {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
};

export const categories: CategoryNav[] = [
  { id: "grocery", name: "Grocery", icon: ShoppingBasket, color: "#0e3b5c" },
  { id: "stationery", name: "Stationery", icon: NotebookPen, color: "#f5a623" },
];

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Grocery", href: "/category/grocery" },
  { label: "Stationery", href: "/category/stationery" },
  { label: "Deals", href: "/deals" },
  { label: "About", href: "/about" },
];
