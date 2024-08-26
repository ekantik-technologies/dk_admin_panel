import { format } from "date-fns";
import React from "react";
import Button from "../../../components/Button/Button";

export default function MachiningOrderCard(props) {
    const { client_id, created_at, product, department, showRejection, machining, resolveRejection } = props;

    const formattedDate = format(created_at, "dd MMM yyyy hh:mm a");

    return (
        <>
            <div className="border border-neutral-300 rounded-xl w-full p-4">
                <div className="flex flex-row justify-between mb-4 border-b border-neutral-300 pb-4">
                    <div className="">
                        <span>Client :</span>
                        <span className="ml-2">{client_id.name}</span>
                    </div>

                    <div className="">
                        <span>{formattedDate}</span>
                    </div>
                </div>

                {showRejection && (
                    <div className="">
                        <div className="flex flex-row gap-4">
                            <span>Rejection Reason : </span>
                            <p className="font-bold">{machining.rejection_reason}</p>
                        </div>
                    </div>
                )}

                {product.map((el, index) => {
                    return (
                        <div key={index} className="border border-neutral-300 p-3 rounded-lg space-y-2 my-4">
                            <div className="flex flex-row justify-between mb-2">
                                <h1 className="text-lg font-bold">{el.id.name}</h1>
                                <span className="text-lg font-bold">{el.quantity}</span>
                            </div>

                            <div className="">
                                <span>Color : </span>
                                <span>{el.color.name}</span>
                            </div>

                            <div className="">
                                <p>
                                    <span>Note : </span>
                                    {el.note}
                                </p>
                            </div>

                            <div>
                                <div className="">
                                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                        <thead>
                                            <tr className="bg-gray-100 border-b">
                                                <th className="py-2 px-1 text-left text-gray-600">Component</th>
                                                {department === "newOrder" && <th className="py-2 px-1 text-left text-gray-600">Available</th>}
                                                <th className="py-2 px-1 text-left text-gray-600">Required</th>
                                                {department !== "pending" && <th className="py-2 px-1 text-left text-gray-600">Status</th>}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {el.components.map((compEl, compIndex) => {
                                                return (
                                                    <tr className="border-b hover:bg-gray-50" key={compIndex}>
                                                        <td className="py-2 px-2 text-gray-800">{compEl.id.name}</td>
                                                        {department === "newOrder" && <td className="py-2 px-2 text-gray-800">{compEl.id.quantity}</td>}
                                                        <td className="py-2 px-2 text-gray-800">{compEl.quantity * el.quantity}</td>
                                                        {department !== "pending" && (
                                                            <td className="py-2 px-2 text-gray-800">
                                                                <div
                                                                    className="w-4 h-4 rounded-full"
                                                                    style={{
                                                                        backgroundColor:
                                                                            department === "newOrder"
                                                                                ? compEl.quantity * el.quantity <= compEl.id.quantity
                                                                                    ? "green"
                                                                                    : "red"
                                                                                : compEl.status === "pending"
                                                                                ? "red"
                                                                                : compEl.status === "completed"
                                                                                ? "green"
                                                                                : "yellow",
                                                                    }}
                                                                />
                                                            </td>
                                                        )}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {showRejection && <Button label="Resolve" onClick={resolveRejection} />}
            </div>
        </>
    );
}

export function PackagingOrderCard(props) {
    const { client_id, created_at = new Date(), product, department, showRejection, packaging, resolveRejection } = props;

    const formattedDate = format(created_at, "dd MMM yyyy hh:mm a");

    return (
        <>
            <div className="border border-neutral-300 rounded-xl w-full p-4">
                <div className="flex flex-row justify-between mb-4 border-b border-neutral-300 pb-4">
                    <div className="">
                        <span>Client :</span>
                        <span className="ml-2">{client_id.name}</span>
                    </div>

                    <div className="">
                        <span>{formattedDate}</span>
                    </div>
                </div>

                {showRejection && (
                    <div className="">
                        <div className="flex flex-row gap-4">
                            <span>Rejection Reason : </span>
                            <p className="font-bold">{packaging.rejection_reason}</p>
                        </div>
                    </div>
                )}

                {product.map((el, index) => {
                    return (
                        <div key={index} className="border border-neutral-300 p-3 rounded-lg space-y-2 my-4">
                            <div className="flex flex-row justify-between mb-2">
                                <h1 className="text-lg font-bold">{el.id.name}</h1>
                                <span className="text-lg font-bold">{el.quantity}</span>
                            </div>

                            <div className="">
                                <span>Box : </span>
                                <span>{el.box.name}</span>
                            </div>

                            <div className="">
                                <p>
                                    <span>Note : </span>
                                    {el.note}
                                </p>
                            </div>

                            <div>
                                <div className="">
                                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                                        <thead>
                                            <tr className="bg-gray-100 border-b">
                                                <th className="py-2 px-1 text-left text-gray-600">Component</th>
                                                {department === "newOrder" && <th className="py-2 px-1 text-left text-gray-600">Available</th>}
                                                <th className="py-2 px-1 text-left text-gray-600">Required</th>
                                                <th className="py-2 px-1 text-left text-gray-600">Status</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr className="border-b hover:bg-gray-50">
                                                <td className="py-2 px-2 text-gray-800">
                                                    <span>Box</span>
                                                </td>
                                                {department === "newOrder" && (
                                                    <td className="py-2 px-2 text-gray-800">
                                                        <span>{el.box.quantity}</span>
                                                    </td>
                                                )}

                                                <td className="py-2 px-2 text-gray-800">
                                                    <span>{el.quantity / el.id.in_a_box}</span>
                                                </td>

                                                <td className="py-2 px-2 text-gray-800">
                                                    <div className={`w-4 h-4 rounded-full ${el.quantity / el.id.in_a_box <= el.box.quantity ? "bg-green-500" : "bg-red-500"}`} />
                                                </td>
                                            </tr>

                                            {el.cartoon?.cartoonType?.name && (
                                                <tr className="border-b hover:bg-gray-50">
                                                    <td className="py-2 px-2 text-gray-800">
                                                        <span>Cartoon :</span>
                                                    </td>

                                                    {department === "newOrder" && (
                                                        <td className="py-2 px-2 text-gray-800">
                                                            <span>{el.cartoon?.cartoonType?.quantity}</span>
                                                        </td>
                                                    )}

                                                    <td className="py-2 px-2 text-gray-800">
                                                        <span>{Math.floor(el.quantity / el?.cartoon?.cartoonType?.in_a_cartoon)}</span>
                                                    </td>

                                                    <td className="py-2 px-2 text-gray-800">
                                                        <div
                                                            className={`w-4 h-4 rounded-full ${
                                                                el.quantity / el?.cartoon?.cartoonType?.in_a_cartoon <= el?.cartoon?.cartoonType?.quantity
                                                                    ? "bg-green-500"
                                                                    : "bg-red-500"
                                                            }`}
                                                        />
                                                    </td>
                                                </tr>
                                            )}

                                            <tr className="border-b hover:bg-gray-50">
                                                <td className="py-2 px-2 text-gray-800">
                                                    <span>Sticker :</span>
                                                </td>
                                                {department === "newOrder" && (
                                                    <td className="py-2 px-2 text-gray-800">
                                                        <span>{el?.id?.sticker?.quantity}</span>
                                                    </td>
                                                )}
                                                <td className="py-2 px-2 text-gray-800">
                                                    <span>{el?.id?.sticker_number * el.quantity}</span>
                                                </td>
                                                <td className="py-2 px-2 text-gray-800">
                                                    <div
                                                        className={`w-4 h-4 rounded-full ${
                                                            el?.id?.sticker_number * el.quantity <= el?.id?.sticker?.quantity ? "bg-green-500" : "bg-red-500"
                                                        }`}
                                                    />
                                                </td>
                                            </tr>

                                            <tr className="hover:bg-gray-50">
                                                <td className="py-2 px-2 text-gray-800">
                                                    <span>Plastic Bag :</span>
                                                </td>
                                                {department === "newOrder" && (
                                                    <td className="py-2 px-2 text-gray-800">
                                                        <span>{el?.id?.plastic_bag?.quantity}</span>
                                                    </td>
                                                )}

                                                <td className="py-2 px-2 text-gray-800">
                                                    <span>{el?.id?.plastic_bag_number * el.quantity}</span>
                                                </td>
                                                <td className="py-2 px-2 text-gray-800">
                                                    <div
                                                        className={`w-4 h-4 rounded-full ${
                                                            el?.id?.plastic_bag_number * el?.quantity <= el?.id?.plastic_bag?.quantity ? "bg-green-500" : "bg-red-500"
                                                        }`}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {showRejection && <Button label="Resolve" onClick={resolveRejection} />}
            </div>
        </>
    );
}
