import React from "react";

export default function Button(props) {
    const { label, onClick, className, bg } = props;

    return (
        <>
            <button className={`${bg ?? "bg-neutral-300"} rounded-md py-2 px-3 w-full ${className}`} onClick={onClick}>
                {label}
            </button>
        </>
    );
}
