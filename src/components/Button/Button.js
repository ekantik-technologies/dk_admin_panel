import React from "react";
import { motion } from "framer-motion";

export default function Button(props) {
    const { label, onClick, className, bg } = props;

    return (
        <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`${bg ?? "bg-[#fff9f5] border-[#3f484f] border"} rounded-md py-2 px-3 w-full ${className}`}
            onClick={onClick}
        >
            {label}
        </motion.button>
    );
}
