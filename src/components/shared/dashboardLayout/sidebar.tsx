"use client";

import React, { useState } from "react";
import {
  FaBars,
  FaChartBar,
  FaTags,
  FaUser,
  FaCog,
  FaTimes,
  FaThLarge,
} from "react-icons/fa";
import { RiQuestionnaireLine } from "react-icons/ri";
import { GrLogout } from "react-icons/gr";
import { cn } from "@/lib/utils";
import { TbMailQuestion } from "react-icons/tb";
import Image from "next/image";
import Logo from "@/assets/Logo.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/user/authSlice";

const menuItems = [
  {
    id: "dashboard",
    icon: FaThLarge,
    label: "Dashboard",
    route: "/seller-dashboard",
  },
  {
    id: "store",
    icon: FaTags,
    label: "Store Management",
    route: "/dashboard/store",
  },
  {
    id: "product",
    icon: FaChartBar,
    label: "Product",
    route: "/dashboard/product",
  },
  {
    id: "service",
    icon: RiQuestionnaireLine,
    label: "Service Management",
    route: "/dashboard/service",
  },
  {
    id: "consultation",
    icon: TbMailQuestion,
    label: "Consultation",
    route: "/dashboard/consultation",
  },
  {
    id: "subscription",
    icon: FaUser,
    label: "Subscription",
    route: "/dashboard/subscription",
  },
  {
    id: "specialist",
    icon: FaCog,
    label: "Specialist",
    route: "/dashboard/specialist",
  },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (id: string, route: string) => {
    setActiveItem(id);
    setSidebarOpen(false);
    router.push(route);
  };
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    // router.push("/login");
    router.push("/login?redirect=" + pathname);
  };
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-full bg-background text-white flex-col p-4 transition-transform duration-300 lg:relative lg:w-64 lg:translate-x-0 lg:flex",
          sidebarOpen ? "translate-x-0 flex" : "-translate-x-full lg:flex"
        )}
      >
        <div className="flex items-center justify-between border-b border-[#1d2c3f] pb-4">
          <Link href="/" className="flex items-center gap-2">
            {/* <div className="flex items-center gap-2">
              <Image
                src={WebLogo}
                alt="Web Icon"
                width={50}
                height={50}
                className="h-6 w-6"
              />

              <span className="font-medium">Naviro</span>
            </div> */}
            <div className="h-[58px] w-[160px]  flex items-center justify-center rounded-md">
              <Image
                src={Logo}
                alt="logo"
                width={500}
                height={500}
                className="h-[58px] w-[160px]"
              />
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white lg:hidden"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="mt-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id, item.route)}
              className={cn(
                "flex items-center gap-3 w-full p-3 rounded-md transition-colors cursor-pointer",
                activeItem === item.id
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 hover:bg-[#1d2c3f]"
              )}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="text-white cursor-pointer flex items-center gap-3 w-full p-3 lg:pl-4 rounded-md hover:bg-[#1d2c3f]"
          >
            <GrLogout /> Logout
          </button>
        </nav>
      </aside>

      <div>
        <div className="lg:hidden p-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-lg font-semibold">
            {menuItems.find((i) => i.id === activeItem)?.label}
          </h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-800"
          >
            <FaBars size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
