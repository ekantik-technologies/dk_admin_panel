import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";

const Loader = () => {
    const loading = useSelector((state) => state.loader.loading);

    if (!loading) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                // backgroundColor: "#3f51b5",
                zIndex: 9999,
                animation: "loading 1.5s infinite",
            }}
        >
            <div className="loader"></div>
        </div>
    );
};

export default Loader;
