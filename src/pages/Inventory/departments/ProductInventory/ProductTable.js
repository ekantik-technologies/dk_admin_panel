import React from "react";

export default function ProductTable(props) {
    const { setCurrentPage, currentPage, totalPages, productList } = props;

    return (
        <>
            <div className="">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-2 px-4 text-left text-gray-600">Name</th>
                            <th className="py-2 px-4 text-left text-gray-600">Quantity</th>
                            <th className="py-2 px-4 text-left text-gray-600">Box</th>
                            <th className="py-2 px-4 text-left text-gray-600">Cartoon</th>
                            <th className="py-2 px-4 text-left text-gray-600">Color</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productList?.length > 0 ? (
                            productList.map((el, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    {console.log(`const el = `, JSON.stringify(el))}
                                    <td className="py-2 px-4 text-gray-800">{el.id.name}</td>
                                    <td className="py-2 px-4 text-gray-800">{el.quantity}</td>
                                    <td className="py-2 px-4 text-gray-800">{el.box.name}</td>
                                    <td className="py-2 px-4 text-gray-800">{el?.cartoon?.cartoonType?.name ?? "No Cartoon for This Product"}</td>
                                    <td className="py-2 px-4 text-gray-800">{el.color.name}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-4 text-center text-gray-500">
                                    No Product Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="py-2 px-4 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
