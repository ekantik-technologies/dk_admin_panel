import React, { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import API from "../../../../API/API";

export default function MachiningOrders(props) {
    const { department, Card } = props;

    const ordersStatus = [
        { label: "Active", value: "active" },
        { label: "New order", value: "newOrder" },
        { label: "Pending", value: "pending" },
    ];

    const [activeDepartment, setActiveDepartment] = useState("active");

    const initialOrderState = { active: [], pending: [], newOrder: [] };
    const [order, setOrder] = useState(initialOrderState);
    const [isLoading, setIsLoading] = useState(false);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const [acceptedResponse, pendingResponse] = await Promise.all([API.get(`/user/orders/${department}/accepted`), API.get(`/user/orders/${department}/pending`)]);

            const active = [];
            const pending = [];

            acceptedResponse.orders.forEach((order) => {
                if (order[department].active) {
                    active.push(order);
                } else {
                    pending.push(order);
                }
            });

            setOrder({
                active,
                pending,
                newOrder: pendingResponse.orders,
            });
        } catch (error) {
            console.log(`error ==>`, error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setOrder(initialOrderState); // Clear previous orders immediately on department change
        fetchOrders(); // Fetch new data
    }, [department]);

    return (
        <>
            <div className="flex flex-row items-center gap-4 max-w-[28vw] mb-6">
                {ordersStatus.map((dept) => (
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

            <div className="-mx-4">
                {isLoading ? (
                    <span className="ml-4 mt-4">Loading...</span> // Loading indicator
                ) : order[activeDepartment].length ? (
                    order[activeDepartment].map((el, index) => (
                        <div className="inline-block align-top m-4 max-w-[45%] w-full" key={index}>
                            <Card {...el} department={activeDepartment} />
                        </div>
                    ))
                ) : (
                    <span className="ml-4 mt-4">No Order at This Moment</span>
                )}
            </div>
        </>
    );
}
