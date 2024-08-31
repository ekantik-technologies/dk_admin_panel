import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="fixed top-0 left-0 w-64 bg-gray-800 text-white h-screen flex flex-col">
            <div className="p-4 text-center text-2xl font-bold border-b border-gray-700">
                <span className="">DK Product</span>
            </div>
            <nav className="flex-1 p-4 overflow-y-auto">
                <ul>
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => `block py-2 px-4 rounded transition-colors ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/order-status"
                            className={({ isActive }) => `block py-2 px-4 mt-2 rounded transition-colors ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`}
                        >
                            Orders Status
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/rejected-order"
                            className={({ isActive }) => `block py-2 px-4 mt-2 rounded transition-colors ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`}
                        >
                            Rejected Order
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/user-setting"
                            className={({ isActive }) => `block py-2 px-4 mt-2 rounded transition-colors ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`}
                        >
                            User Setting
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/client" className={({ isActive }) => `block py-2 px-4 mt-2 rounded transition-colors ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`}>
                            Client
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/configuration"
                            className={({ isActive }) => `block py-2 px-4 mt-2 rounded transition-colors ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`}
                        >
                            Configuration
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/inventory" className={({ isActive }) => `block py-2 px-4 mt-2 rounded transition-colors ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`}>
                            Inventory
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/product" className={({ isActive }) => `block py-2 px-4 mt-2 rounded transition-colors ${isActive ? "bg-gray-700" : "hover:bg-gray-600"}`}>
                            Product
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
