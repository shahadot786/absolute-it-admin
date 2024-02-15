import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export const COLLECTION = {
  categories: "Categories",
};
export const ROUTE_LINK = {
  categories: "/dashboard/frontend/categories",
};
export const NAV_TITLE = {
  categories: "Categories",
};

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    company: "Dell",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    company: "TechCorp",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    company: "WebTech",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "David Smith",
    company: "Innovate Inc.",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    company: "TechGuru",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 6,
    name: "James Brown",
    company: "CodeGenius",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 7,
    name: "Laura White",
    company: "SoftWorks",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 8,
    name: "Michael Lee",
    company: "DevCraft",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 9,
    name: "Olivia Green",
    company: "WebSolutions",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 10,
    name: "Robert Taylor",
    company: "DataTech",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
];

export type Category = {
  id: string;
  name: string;
};

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Customer",
    href: "/dashboard/backend/customers",
    icon: "usersRound",
    label: "customers",
  },
  {
    title: "Orders",
    href: "/dashboard/backend/orders",
    icon: "baggageClaim",
    label: "orders",
  },
  {
    title: "Products",
    href: "/dashboard/frontend/products",
    icon: "laptop",
    label: "products",
  },
  {
    title: "Categories",
    href: ROUTE_LINK.categories,
    icon: "layoutList",
    label: "categories",
  },
  // {
  //   title: "User",
  //   href: "/dashboard/backend/user",
  //   icon: "user",
  //   label: "user",
  // },
  // {
  //   title: "Employee",
  //   href: "/dashboard/backend/employee",
  //   icon: "employee",
  //   label: "employee",
  // },
  // {
  //   title: "Profile",
  //   href: "/dashboard/backend/profile",
  //   icon: "profile",
  //   label: "profile",
  // },
  // {
  //   title: "Kanban",
  //   href: "/dashboard/backend/kanban",
  //   icon: "kanban",
  //   label: "kanban",
  // },

  // {
  //   title: "Payments",
  //   href: "/dashboard/backend/payments",
  //   icon: "circleDollarSign",
  //   label: "payments",
  // },
  // {
  //   title: "Revenue",
  //   href: "/dashboard/backend/revenue",
  //   icon: "circleDollarSign",
  //   label: "revenue",
  // },
  // {
  //   title: "Sales",
  //   href: "/dashboard/backend/sales",
  //   icon: "kanban",
  //   label: "sales",
  // },
  {
    title: "Settings",
    href: "/dashboard/backend/settings",
    icon: "kanban",
    label: "settings",
  },
];
