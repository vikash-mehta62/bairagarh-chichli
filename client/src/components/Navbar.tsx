"use client";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  Home,
  Info,
  BriefcaseBusiness, // More specific for services
  Building,
  Newspaper,
  Users,
  Phone,
  PlusCircle,
  Headset,
  Search, // Added for search icon
  UserCircle2, // A more defined user icon for profile
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { logout } from "../service/operations/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // New state for scroll effect
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth?.user ?? null);
  const token = useSelector((state: RootState) => state.auth?.token ?? null);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Services", href: "/services", icon: BriefcaseBusiness },
    { name: "Properties", href: "/properties", icon: Building },
    { name: "News", href: "/blogs", icon: Newspaper },
    { name: "Career", href: "/careers", icon: Users },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  const getDashboardUrl = () => {
    if (!user) return "/";
    if (user.role === "admin") {
      return "/admin/dashboard";
    } else if (user.role === "vendor") {
      return "/vendor/dashboard";
    }
    return "/";
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
    setIsUserDropdownOpen(false);
    setIsMenuOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust scroll threshold as needed
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Close login dropdown
      if (!target.closest(".login-dropdown-container")) {
        setIsLoginDropdownOpen(false);
      }
      // Close user dropdown
      if (!target.closest(".user-dropdown-container")) {
        setIsUserDropdownOpen(false);
      }
      // Close search bar
      if (!target.closest(".search-container")) {
        setIsSearchOpen(false);
      }
      // Close mobile menu
      if (!target.closest(".mobile-menu-container") && !target.closest(".menu-button")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg py-2" : "bg-transparent py-4"}`}>
      <div className="w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <p className="text-3xl font-extrabold text-indigo-700 transition-colors group-hover:text-indigo-900">
                Company<span className="text-orange-300">Name</span>
              </p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-7">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-1 py-2 text-sm font-semibold transition-all duration-300 group ${
                  isActive(item.href)
                    ? "text-indigo-700 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-indigo-600 after:rounded-t-sm after:scale-x-100"
                    : "text-gray-700 hover:text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-indigo-600 after:rounded-t-sm after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300"
                }`}
              >
                {item.name}
              </Link>
            ))}

        

            <Link to="/vendor">
              <button className="relative bg-white border-2 border-indigo-600 text-indigo-600 px-5 py-2 rounded-full flex items-center gap-2 font-semibold hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300 overflow-hidden group shadow-sm hover:shadow-md">
                <PlusCircle className="w-4 h-4 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
                Post Property
                <span className="relative ml-2 text-xs font-bold px-2 py-0.5 rounded-full bg-orange-400 text-gray-900 leading-none group-hover:bg-orange-500 transition-colors cursor-help tooltip-container">
                  FREE
                  <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0 after:border-l-4 after:border-r-4 after:border-t-4 after:border-l-transparent after:border-r-transparent after:border-t-gray-800">
                    It's 100% Free!
                  </span>
                </span>
              </button>
            </Link>
            <Link to="/customer-support">
              <button className="text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-full flex items-center gap-2 font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                <Headset className="w-4 h-4" />
                Support
              </button>
            </Link>

            {/* User Authentication Section */}
            {token && user ? (
              <div className="relative user-dropdown-container">
                <Button
                  className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white flex items-center px-4 py-2 rounded-full hover:from-indigo-700 hover:to-indigo-900 transition-all duration-300 shadow-lg"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  aria-haspopup="true"
                  aria-expanded={isUserDropdownOpen}
                >
                  <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center mr-2 overflow-hidden border border-indigo-300">
                    {user.avatar ? (
                      <img src={user.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-4 h-4 text-indigo-600" />
                    )}
                  </div>
                  <span className="truncate max-w-[100px] font-medium text-sm">
                    {user.name || user.email.split('@')[0]}
                  </span>
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isUserDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                </Button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 animate-fade-in-scale origin-top-right">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {user.name || user.email}
                      </p>
                      <p className="text-xs text-gray-500 capitalize mt-0.5">
                        {user.role}
                      </p>
                    </div>

                    <Link
                      to={getDashboardUrl()}
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4 mr-3 text-gray-500" />
                      Dashboard
                    </Link>
                    <Link
                      to="/user/profile" 
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      <UserCircle2 className="w-4 h-4 mr-3 text-gray-500" />
                      View Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1 rounded-b-xl"
                    >
                      <LogOut className="w-4 h-4 mr-3 text-red-400" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Login dropdown for non-authenticated users
              <div className="relative login-dropdown-container">
                <Button
                  className="bg-indigo-600 text-white flex items-center px-4 py-2 rounded-full hover:bg-indigo-700 transition-all duration-300 shadow-lg"
                  onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                  aria-haspopup="true"
                  aria-expanded={isLoginDropdownOpen}
                >
                  Login <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isLoginDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                </Button>

                {isLoginDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100 animate-fade-in-scale origin-top-right">
                    <Link
                      to="/admin/login"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      onClick={() => setIsLoginDropdownOpen(false)}
                    >
                      Admin Login
                    </Link>
                    <Link
                      to="/vendor/login"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      onClick={() => setIsLoginDropdownOpen(false)}
                    >
                      Vendor Login
                    </Link>
                    <Link
                      to="/vendor/register"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      onClick={() => setIsLoginDropdownOpen(false)}
                    >
                      Vendor Register
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center menu-button">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 p-2 focus:outline-none transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isMenuOpen && (
          <>
            {/* Overlay with Glassmorphism Effect */}
            <div
              className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Sidebar */}
            <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out flex flex-col mobile-menu-container rounded-l-2xl">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                {/* Mobile Logo */}
                <p className="text-2xl font-extrabold text-indigo-700">
                  Company<span className="text-orange-500">Name</span>
                </p>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-indigo-600 p-2 focus:outline-none transition-colors"
                  aria-label="Close mobile menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col h-full overflow-y-auto">
                {/* User Info Section (Mobile) */}
                {token && user && (
                  <div className="p-4 border-b border-gray-100 bg-indigo-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border border-indigo-300">
                        {user.avatar ? (
                            <img src={user.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 truncate">
                          {user.name || user.email.split('@')[0]}
                        </p>
                        <p className="text-sm text-gray-600 capitalize">
                          {user.role}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              

                {/* Navigation Links (Mobile) */}
                <div className="py-4 flex-grow">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center px-6 py-3 text-base font-medium transition-colors duration-200 ${
                          isActive(item.href)
                            ? "text-indigo-700 bg-indigo-50 border-r-4 border-indigo-600"
                            : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3 text-gray-500" />
                        {item.name}
                      </Link>
                    );
                  })}
                  <div className="mt-5 px-6">
                    <Link to="/vendor">
                      <button className="w-full bg-white border-2 border-indigo-600 text-indigo-600 px-4 py-2.5 rounded-full flex items-center justify-center gap-2 font-semibold hover:bg-indigo-50 hover:text-indigo-700 transition-colors shadow-sm">
                        <PlusCircle className="w-4 h-4" />
                        Post Property
                        <span className="bg-orange-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                          FREE
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Dashboard & Profile Links (Mobile) */}
                {token && user && (
                  <div className="border-t border-gray-100 p-4">
                    <Link
                      to={getDashboardUrl()}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg"
                    >
                      <LayoutDashboard className="w-5 h-5 mr-3 text-gray-500" />
                      Dashboard
                    </Link>
                    <Link
                      to="/user/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg"
                    >
                      <UserCircle2 className="w-5 h-5 mr-3 text-gray-500" />
                      View Profile
                    </Link>
                  </div>
                )}

                {/* Auth Section (Mobile) */}
                <div className="border-t border-gray-100 p-4">
                  {token && user ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg justify-center transition-colors shadow-sm"
                    >
                      <LogOut className="w-5 h-5 mr-3 text-red-400" />
                      Logout
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/admin/login"
                        className="block w-full px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Login
                      </Link>
                      <Link
                        to="/vendor/login"
                        className="block w-full px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Vendor Login
                      </Link>
                      <Link
                        to="/vendor/register"
                        className="block w-full px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Vendor Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;