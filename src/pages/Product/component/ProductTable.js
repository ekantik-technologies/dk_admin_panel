import React from "react";
import { CheckBox } from "../../../components/CheckBox/CheckBox.js";
import { ReactComponent as EditIcon } from "../../../Assets/edit.svg";
import { EDIT_PRODUCT } from "../../../constants/modelConstant.js";
import UpdateQuantity from "../model/UpdateQuantity.js";

const ProductTable = (props) => {
    const { selectedProduct, setSelectedProduct, currentPage, totalPages, productList, setCurrentPage, setShowPopup, setSelectedProductDetails, fetchProductList } = props;

    const handleSelection = (_, id) => {
        selectedProduct.includes(id)
            ? setSelectedProduct((prevState) => {
                  return prevState.filter((el) => el !== id);
              })
            : setSelectedProduct((prevState) => [...prevState, id]);
    };

    return (
        <div className="p-4">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 px-4 text-left text-gray-600">Name</th>
                        <th className="py-2 px-4 text-left text-gray-600">Quantity</th>
                        <th className="py-2 px-4 text-left text-gray-600">Box</th>
                        <th className="py-2 px-4 text-left text-gray-600">Color</th>
                        <th className="py-2 px-4 text-left text-gray-600">Sticker</th>
                        <th className="py-2 px-4 text-left text-gray-600">Plastic bag</th>
                        <th className="py-2 px-4 text-left text-gray-600">Component</th>
                        <th className="py-2 px-4 text-left text-gray-600 w-fit">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {productList?.length > 0 ? (
                        productList.map((el, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 text-gray-800">
                                    <div className="flex flex-row items-center gap-2">
                                        <span
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setShowPopup(EDIT_PRODUCT);

                                                setSelectedProductDetails(el);
                                            }}
                                        >
                                            <EditIcon />
                                        </span>

                                        <CheckBox
                                            setIsChecked={(isChecked) => handleSelection(isChecked, el._id)}
                                            label={el.name}
                                            paddingL="pl-3"
                                            optionId={el.name}
                                            isChecked={selectedProduct.includes(el._id)}
                                        />
                                    </div>
                                </td>
                                <td className="py-2 px-4 text-gray-800">{el.quantity}</td>
                                <td className="py-2 px-4 text-gray-800">
                                    {el.box.map((boxEl, index) => {
                                        return (
                                            <span key={index} className="px-1.5 py-1 mr-1 rounded-md bg-neutral-200 inline-block">
                                                {boxEl.name}
                                            </span>
                                        );
                                    })}
                                </td>
                                <td className="py-2 px-4 text-gray-800">
                                    {el.color.map((colorEl, index) => {
                                        return (
                                            <span key={index} className="px-1.5 py-1 mr-1 rounded-md bg-neutral-200 inline-block">
                                                {colorEl.name}
                                            </span>
                                        );
                                    })}
                                </td>
                                <td className="py-2 px-4 text-gray-800">{el.sticker}</td>
                                <td className="py-2 px-4 text-gray-800">{el.plastic_bag}</td>
                                <td className="py-2 px-4 text-gray-800">
                                    <div className="flex flex-col">
                                        {el.components.map((comEl, index) => {
                                            return (
                                                <div className="flex flex-col mb-1 px-1.5 last:mb-0 border border-neutral-300 rounded-md w-fit" key={index}>
                                                    <div className="">
                                                        <span>Name - </span>
                                                        <span>{comEl.id.name}</span>
                                                    </div>
                                                    <div className="">
                                                        <span>Quantity - </span>
                                                        <span>{comEl.quantity}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </td>
                                <td className="py-2 px-4 text-gray-800">
                                    <UpdateQuantity {...el} fetchProductList={fetchProductList} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="py-4 text-center text-gray-500">
                                No product found
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
    );
};

export default ProductTable;
