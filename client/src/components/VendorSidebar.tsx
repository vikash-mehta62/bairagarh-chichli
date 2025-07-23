// const vendorMenuItems = [
//   {
//     title: "Dashboard",
//     url: "/vendor/dashboard",
//     icon: Home,
//   },
//   {
//     title: "My Profile",
//     url: "/vendor/my-profile",
//     icon: PersonStandingIcon,
//   },
//   {
//     title: "My Properties",
//     url: "/vendor/properties",
//     icon: Building,
//   },
//   {
//     title: "Add Property",
//     url: "/vendor/add-property",
//     icon: Plus,
//   },
//   {
//     title: "Property Inquiry",
//     url: "/vendor/get-inquiry",
//     icon: Building,
//   },
//   {
//     title: "General Inquiry",
//     url: "/vendor/inquiry",
//     icon: Building,
//   },
// ];
import React, { useState, useEffect, useRef } from "react";
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineUser } from "react-icons/ai";
import { MdLogout, MdOutlineRealEstateAgent } from "react-icons/md";
import { FaHome, FaRegImages } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../service/operations/auth";
import { FcBullish, FcPlus, FcPieChart } from "react-icons/fc";
import { PiBuildingsFill } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Building, Plus, Users } from "lucide-react";
import { RootState } from "@/redux/store";

const VendorSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(
    typeof window !== "undefined" &&
      localStorage.getItem("sidebarCollapsed") === "true"
  );

  const user = useSelector((state: RootState) => state.auth?.user ?? null);
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const handleToggle = () => {
    const collapsed = !isCollapsed;
    setIsCollapsed(collapsed);
    localStorage.setItem("sidebarCollapsed", collapsed.toString());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsCollapsed(true);
        localStorage.setItem("sidebarCollapsed", "true");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { href: "/", icon: <FaHome />, label: "Back To Home" },
    { href: "/vendor/dashboard", icon: <FcBullish />, label: "Dashboard" },
    { href: "/vendor/my-profile", icon: <Users />, label: "My Profile" },
    { href: "/vendor/properties", icon: <Building />, label: " My Properties" },
    {
      href: "/vendor/add-property",
      icon: <Building />,
      label: "Add Properties",
    },
    {
      href: "/vendor/get-inquiry",
      icon: <FcPlus />,
      label: "Property Inquiry ",
    },
    { href: "/vendor/inquiry", icon: <FcPieChart />, label: "Genral Inquiry " },
  ].filter(Boolean);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-screen z-50 bg-white shadow-md transition-all duration-300 overflow-y-auto ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b">
        {!isCollapsed && (
          <div className="text-xl font-bold text-gray-700">Vendor Panel</div>
        )}
        <button
          onClick={handleToggle}
          className="text-gray-600 hover:text-black"
        >
          {isCollapsed ? <CiMenuFries size={22} /> : <RxCross1 size={22} />}
        </button>
      </div>

      <ul className="p-4 flex flex-col gap-2">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                location.pathname === item.href
                  ? "bg-yellow-100 text-yellow-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={handleToggle}
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && <span className="text-base">{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-0  w-full px-4">
        <div
          className={`flex items-center gap-3 p-3 rounded-lg bg-slate-100 mb-2 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div className="text-gray-700 text-lg">
            <AiOutlineUser />
          </div>
          {!isCollapsed && (
            <span className="text-gray-700 text-sm font-medium">
              {user?.name
                ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                : "User"}
            </span>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-2 justify-center w-full p-3 rounded-lg text-white bg-red-600 hover:bg-red-700 transition ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <MdLogout size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default VendorSidebar;
