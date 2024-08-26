import React, { useState } from "react";
import Button from "../../components/Button/Button";
import MachiningOrders from "./component/machining/MachiningOrders";
import MachiningOrderCard, { PackagingOrderCard } from "./component/OrderCard";
import BillingOrders from "./component/BillingOrders/BillingOrders";

export default function Index() {
    const department = [
        { title: "Machining", value: "machining", card: MachiningOrderCard },
        { title: "Packaging", value: "packaging", card: PackagingOrderCard },
        { title: "Billing", value: "billing" },
    ];

    const [activeDepartment, setActiveDepartment] = useState("machining");

    return (
        <>
            <div className="flex flex-row items-center gap-4 max-w-[28vw] mb-6">
                {department.map((dept) => (
                    <Button
                        key={dept.value}
                        label={dept.title}
                        onClick={() => setActiveDepartment(dept.value)}
                        bg={`transition-colors duration-300 ${
                            activeDepartment === dept.value
                                ? "bg-neutral-300 border-neutral-300 border"
                                : "bg-neutral-100 border-neutral-300 border text-black hover:bg-neutral-200"
                        }`}
                    />
                ))}
            </div>

            <div className="pt-6 border-t border-neutral-300">
                {activeDepartment === "machining" && <MachiningOrders Card={department.find((el) => el.value === activeDepartment).card} department="machining" />}
                {activeDepartment === "packaging" && <MachiningOrders Card={department.find((el) => el.value === activeDepartment).card} department="packaging" />}
                {activeDepartment === "billing" && <BillingOrders />}
            </div>
        </>
    );
}
