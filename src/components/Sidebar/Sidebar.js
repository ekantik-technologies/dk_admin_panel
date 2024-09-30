import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ReactComponent as DashboardIcon } from "../../Assets/dashboard.svg";
import { ReactComponent as RejectedOrderIcon } from "../../Assets/reimbursement.svg";
import { ReactComponent as UserIcon } from "../../Assets/user.svg";
import { ReactComponent as ClientIcon } from "../../Assets/group.svg";
import { ReactComponent as SettingIcon } from "../../Assets/settings.svg";
import { ReactComponent as POSIcon } from "../../Assets/pos.svg";
import { ReactComponent as MenuIcon } from "../../Assets/menu.svg";
import { ReactComponent as ScheduleIcon } from "../../Assets/schedule.svg";
import { ReactComponent as OrderIcon } from "../../Assets/order.svg";
import dkLogo from "../../Assets/dkLogo.png";

const sidebarVariants = {
    open: { width: "16rem", transition: { duration: 0.5, ease: "easeInOut" } },
    closed: { width: "4rem", transition: { duration: 0.5, ease: "easeInOut" } },
};

const linkVariants = {
    hover: {
        backgroundColor: "#4A5568",
        transition: { duration: 0.3 },
        paddingLeft: 25,
    },
};

const Sidebar = () => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <motion.div
            className="fixed top-0 left-0 h-screen bg-gradient-to-b from-[#3f484f] to-[#2d343b] text-white flex flex-col items-center py-4"
            animate={isOpen ? "open" : "closed"}
            variants={sidebarVariants}
            initial={false}
        >
            <div className="text-center text-xl font-bold mb-6 cursor-pointer">
                <NavLink to="/dashboard">
                    <motion.img src={dkLogo} className="w-48 h-auto mx-auto" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }} />
                </NavLink>
            </div>

            <nav className="flex-1 w-full">
                <ul className="space-y-2 pl-2">
                    {[
                        { to: "/dashboard", icon: DashboardIcon, label: "Dashboard" },
                        { to: "/order-status", icon: ScheduleIcon, label: "Orders Status" },
                        { to: "/rejected-order", icon: RejectedOrderIcon, label: "Rejected Order" },
                        { to: "/user-setting", icon: UserIcon, label: "User Setting" },
                        { to: "/client", icon: ClientIcon, label: "Client" },
                        { to: "/client-orders", icon: OrderIcon, label: "Client Order" },
                        { to: "/configuration", icon: SettingIcon, label: "Configuration" },
                        { to: "/inventory", icon: POSIcon, label: "Inventory" },
                        { to: "/product", icon: MenuIcon, label: "Product" },
                    ].map((item) => (
                        <motion.li key={item.to} variants={linkVariants} whileHover="hover" className="group flex items-center">
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center py-2 px-2 w-full rounded transition-all duration-300 ${isActive ? "bg-neutral-500" : "hover:bg-gray-600"}`
                                }
                            >
                                <item.icon className="stroke-white h-5 w-5" />
                                <motion.span className="ml-4" animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }} transition={{ duration: 0.3 }}>
                                    {item.label}
                                </motion.span>
                            </NavLink>
                        </motion.li>
                    ))}
                </ul>
            </nav>
        </motion.div>
    );
};

export default Sidebar;
