import React, { useState } from "react";
import Button from "../../components/Button/Button.js";
import Machining from "./departments/machining/index.js";

export default function Index() {
    const [activeDepartment, setActiveDepartment] = useState("machining");

    const departments = [
        { label: "Component", value: "machining" },
        { label: "Box", value: "box" },
        { label: "Plastic Bag", value: "plastic_bag" },
        { label: "Sticker", value: "sticker" },
        { label: "Cartoon", value: "cartoon" },
    ];

    return (
        <>
            <div className="flex flex-row items-center gap-4 max-w-[55vw] mb-6">
                {departments.map((dept) => (
                    <Button
                        key={dept.value}
                        label={dept.label}
                        onClick={() => setActiveDepartment(dept.value)}
                        bg={`transition-colors duration-300 ${
                            activeDepartment === dept.value ? "bg-neutral-300" : "bg-neutral-100 border-neutral-300 border text-black hover:border-0 hover:bg-neutral-200"
                        }`}
                    />
                ))}
            </div>

            <div className="pt-12 border-neutral-300 border-t">
                <Machining department={activeDepartment} />
            </div>
        </>
    );
}
