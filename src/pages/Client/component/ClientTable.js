import React from "react";
import { format } from "date-fns";
import { CheckBox } from "../../../components/CheckBox/CheckBox";
import { ReactComponent as EditIcon } from "../../../Assets/edit.svg";
import { EDIT_CLIENT } from "../../../constants/modelConstant";

const ClientTable = (props) => {
    const { selectedClient, setSelectedClient, currentPage, totalPages, clients, setCurrentPage, setShowPopup, setSelectedClientDetails } = props;

    const handleSelection = (_, id) => {
        selectedClient.includes(id)
            ? setSelectedClient((prevState) => {
                  return prevState.filter((el) => el !== id);
              })
            : setSelectedClient((prevState) => [...prevState, id]);
    };

    return (
        <div className="p-4">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-2 px-4 text-left text-gray-600">Client Name</th>
                        <th className="py-2 px-4 text-left text-gray-600">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {clients?.length > 0 ? (
                        clients.map((user, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4 text-gray-800">
                                    <div className="flex flex-row items-center gap-2">
                                        <span
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setShowPopup(EDIT_CLIENT);

                                                setSelectedClientDetails(user);
                                            }}
                                        >
                                            <EditIcon />
                                        </span>

                                        <CheckBox
                                            setIsChecked={(isChecked) => handleSelection(isChecked, user._id)}
                                            label={user.name}
                                            paddingL="pl-3"
                                            optionId={user.name}
                                            isChecked={selectedClient.includes(user._id)}
                                        />
                                    </div>
                                </td>
                                <td className="py-2 px-4 text-gray-800">{format(new Date(user.created_at), "MMMM d, yyyy h:mm a")}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="py-4 text-center text-gray-500">
                                No clients found
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

export default ClientTable;
