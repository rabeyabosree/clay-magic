import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice"; // Redux Thunk action for logout
import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CornerDownLeft,
  Heart,
  LogOut,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  User,
  UserPen,
} from "lucide-react";

import SearchContainer from "./common/SearchContainer";


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const handlelogin = () => {
    navigate('/login')
  }
  // Handle the cart button click
  const handleCart = () => {
    navigate("/cart");
  };

  // Handle user logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Optionally redirect after logout
  };

  // Profile menu with dynamic paths
  const profileMenu = [
    { menu: "Profile", icon: <UserPen />, path: `/profile` }, // Dynamically insert user.id
    { menu: "Orders", icon: <ShoppingBag />, path: `/orders/${user?._id}` }, // Dynamically insert user.id
    { menu: "Wishlist", icon: <Heart />, path: "/wishlist" },
    { menu: "Notification", icon: <Bell />, path: "/notification" },
  ];

  // Terms and Privacy links
  const termsAndPrivacy = [
    { menu: "Terms and Conditions", icon: <ReceiptText />, path: "/terms-condition" },
    { menu: "Privacy Policy", icon: <ShieldCheck />, path: "/privacy-policy" },
    { menu: "Return Policy", icon: <CornerDownLeft />, path: "/return-policy" },
    { menu: "Delete Account", icon: <Trash2 />, path: "/account-delete" },
  ];

  return (
    <nav className=" fixed top-0 z-50 left-0 right-0 h-14 sm:h-20 px-10 py-4 shadow-sm">
    <div className="container mx-auto flex items-center justify-between px-4 ">
      {/* Logo */}
      <div className="text-base sm:text-base md:text-base lg:text-xl font-bold text-gray-800 flex items-center">
        <span className="text-ButtonColor">Clay Magic</span>
      </div>
  
      {/* Middle content: Search and Cart */}
      <div className="flex items-center lg:ml-auto ">
  
        {/* Search Bar: Position it right on mobile */}
        <div >
          <SearchContainer  />
        </div>
  
        {/* Cart Icon */}
        <div className="flex items-center space-x-6">
          <button className="relative" onClick={handleCart}>
            <ShoppingCart size={24} className="text-gray-700 hover:text-blue-500" />
          </button>
  
          {/* If the user is logged in, show the profile menu */}
          {user ? (
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="flex items-center ">
              <User size={24} className="text-gray-700 hover:text-blue-500 text-sm sm:text-base lg:text-xl" />

                <span className="hidden lg:block text-gray-700 font-medium text-sm sm:text-base">
                  {user?.userName} {/* Display user name */}
                </span>
              </Menu.Button>
  
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none">
                <div className="px-4 py-2 text-sm text-gray-700 font-semibold">My Profile</div>
                {profileMenu.map((menu, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        onClick={() => navigate(menu.path)} // Use navigate for programmatic navigation
                        className={`${active ? "bg-gray-100" : ""} w-full text-left px-4 py-2 text-gray-700 flex items-center space-x-2`}
                      >
                        <span>{menu.icon}</span>
                        <span>{menu.menu}</span>
                      </button>
                    )}
                  </Menu.Item>
                ))}
  
                {/* Submenu for Terms & Privacy */}
                <hr />
                <div className="px-4 py-2 text-sm text-gray-700 font-semibold">Terms & Privacy</div>
  
                {termsAndPrivacy.map((menu, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        onClick={() => navigate(menu.path)} // Use navigate for programmatic navigation
                        className={`${active ? "bg-gray-100" : ""} w-full text-left px-4 py-2 text-gray-700 flex items-center space-x-2`}
                      >
                        <span>{menu.icon}</span>
                        <span>{menu.menu}</span>
                      </button>
                    )}
                  </Menu.Item>
                ))}
  
                {/* Logout */}
                <hr />
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${active ? "bg-gray-100" : ""} w-full text-left px-4 py-2 text-red-500 flex items-center space-x-2`}
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <button onClick={handlelogin} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  </nav>
  
  );
};

export default Navbar;


/**
  
 <nav className="bg-white shadow-md fixed top-0 z-50 left-0 right-0">
   <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-10">
     
     <div className="text-xl font-bold text-gray-800 flex items-center">
       <span className="text-blue-500">Clay Magic</span>
     </div>

     {/* Middle content: Search and Cart }
 <div className="flex items-center space-x-6 lg:space-x-8 lg:ml-auto">

{/* Search Bar: Position it right on mobile }
<div className="flex items-center lg:ml-auto">
<SearchContainer />
</div>
     {/* Cart and User Actions }
     <div className="flex items-center space-x-6">
       <button className="relative" onClick={handleCart}>
         <ShoppingCart size={24} className="text-gray-700 hover:text-blue-500" />
       </button>

       {/* If the user is logged in, show the profile menu }
       {user ? (
         <Menu as="div" className="relative inline-block text-left">
           <Menu.Button className="flex items-center space-x-2">
             <User size={24} className="text-gray-700 hover:text-blue-500" />
             <span className="hidden lg:block text-gray-700 font-medium">
               {user?.userName } {/* Display user name }
             </span>

           </Menu.Button>

           <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none">
             <div className="px-4 py-2 text-sm text-gray-700 font-semibold">My Profile</div>
             {profileMenu.map((menu, index) => (
               <Menu.Item key={index}>
                 {({ active }) => (
                   <button
                     onClick={() => navigate(menu.path)} // Use navigate for programmatic navigation
                     className={`${active ? "bg-gray-100" : ""} w-full text-left px-4 py-2 text-gray-700 flex items-center space-x-2`}
                   >
                     <span>{menu.icon}</span>
                     <span>{menu.menu}</span>
                   </button>
                 )}
               </Menu.Item>
             ))}


             <hr />
             <div className="px-4 py-2 text-sm text-gray-700 font-semibold">Terms & Privacy</div>

             {termsAndPrivacy.map((menu, index) => (
               <Menu.Item key={index}>
                 {({ active }) => (
                   <button
                     onClick={() => navigate(menu.path)} // Use navigate for programmatic navigation
                     className={`${active ? "bg-gray-100" : ""} w-full text-left px-4 py-2 text-gray-700 flex items-center space-x-2`}
                   >
                     <span>{menu.icon}</span>
                     <span>{menu.menu}</span>
                   </button>
                 )}
               </Menu.Item>
             ))}

 
             <hr />
             <Menu.Item>
               {({ active }) => (
                 <button
                   onClick={handleLogout}
                   className={`${active ? "bg-gray-100" : ""} w-full text-left px-4 py-2 text-red-500 flex items-center space-x-2`}
                 >
                   <LogOut size={18} />
                   <span>Logout</span>
                 </button>
               )}
             </Menu.Item>
           </Menu.Items>
         </Menu>
       ) : (
         <button onClick={handlelogin} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
           Login
         </button>
       )}
     </div>
   </div>
 </nav>
 **/