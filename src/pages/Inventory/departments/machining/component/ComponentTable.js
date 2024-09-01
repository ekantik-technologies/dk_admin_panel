import React from "react";
import { CheckBox } from "../../../../../components/CheckBox/CheckBox";
import { ReactComponent as EditIcon } from "../../../../../Assets/edit.svg";
import { EDIT_COMPONENT } from "../../../../../constants/modelConstant";
import UpdateQuantity from "../../../component/UpdateQuantity";
import { motion } from "framer-motion";

const AnimatedTable = motion.table;
const AnimatedTr = motion.tr;

const ComponentTable = (props) => {
    const {
        selectedComponent,
        setSelectedComponent,
        currentPage,
        totalPages,
        componentList,
        setCurrentPage,
        setShowPopup,
        setSelectedComponentDetails,
        fetchComponentList,
        department,
    } = props;

    const handleSelection = (_, id) => {
        selectedComponent.includes(id) ? setSelectedComponent((prevState) => prevState.filter((el) => el !== id)) : setSelectedComponent((prevState) => [...prevState, id]);
    };

    const handleSelectAll = () => {
        componentList.map((el) => handleSelection(null, el._id));
    };

    return (
        <div className="">
            <AnimatedTable className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gradient-to-r from-[#3f484f] to-[#5b636b] text-white">
                        <th className="py-2 px-4 text-left w-[5%]">
                            <CheckBox setIsChecked={() => handleSelectAll()} isChecked={selectedComponent.length === componentList?.length} />
                        </th>
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Quantity</th>
                        <th className="py-2 px-4 text-left">Min. Quantity</th>
                        {department === "cartoon" && <th className="py-2 px-4 text-left">In a Box</th>}
                        <th className="py-2 px-4 text-left w-fit">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {componentList?.length > 0 ? (
                        componentList.map((el, index) => (
                            <AnimatedTr
                                key={index}
                                className="border-b hover:bg-[#fef3e7]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <td className="py-2 px-4 text-gray-800">
                                    <div className="flex flex-row items-center gap-2">
                                        <CheckBox
                                            setIsChecked={(isChecked) => handleSelection(isChecked, el._id)}
                                            // label={el.name}
                                            paddingL="pl-3"
                                            optionId={el.name}
                                            isChecked={selectedComponent.includes(el._id)}
                                        />
                                    </div>
                                </td>
                                <td className="py-2 px-4 text-gray-800">{el.name}</td>
                                <td className="py-2 px-4 text-gray-800">{el.quantity}</td>
                                <td className="py-2 px-4 text-gray-800">{el.minimum_quantity}</td>
                                {department === "cartoon" && <td className="py-2 px-4 text-gray-800">{el.in_a_cartoon}</td>}
                                <td className="py-2 px-4 text-gray-800">
                                    <UpdateQuantity
                                        handleClickEdit={() => {
                                            setShowPopup(EDIT_COMPONENT);
                                            setSelectedComponentDetails(el);
                                        }}
                                        department={department}
                                        {...el}
                                        fetchComponentList={fetchComponentList}
                                    />
                                </td>
                            </AnimatedTr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-4 text-center text-gray-500">
                                No component found
                            </td>
                        </tr>
                    )}
                </tbody>
            </AnimatedTable>

            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-600 disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md transition-colors duration-300 hover:bg-blue-600 disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ComponentTable;
