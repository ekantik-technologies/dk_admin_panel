import React, { useEffect, useState } from "react";
import ButtonController from "./component/ButtonController";
import UserModel from "./model/UserModel.js";
import { ADD_USER, EDIT_USER } from "../../constants/modelConstant.js";
import UserTable from "./component/UserTable.js";
import API from "../../API/API.js";
import CryptoJS from "crypto-js";

export default function Index() {
    const [showPopup, setShowPopup] = useState(null);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [selectedUserDetails, setSelectedUserDetails] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await API.get(`/admin/users?page=${currentPage}`);
            setUsers(response.users);
            setCurrentPage(currentPage);
            setTotalPages(response.total_pages);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const handleSelectAll = () => {
        selectedUsers.length !== users.length ? setSelectedUsers(users.map((el) => el._id)) : setSelectedUsers([]);
    };

    const decrypt = (cipherText) => {
        const bytes = CryptoJS.AES.decrypt(cipherText, process.env.REACT_APP_SECRET_KEY);

        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        return decryptedData;
    };

    return (
        <>
            <ButtonController fetchUsers={fetchUsers} setShowPopup={setShowPopup} selectedUsers={selectedUsers} handleSelectAll={handleSelectAll} />

            <UserTable
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                currentPage={currentPage}
                totalPages={totalPages}
                users={users}
                setCurrentPage={setCurrentPage}
                setShowPopup={setShowPopup}
                setSelectedUserDetails={setSelectedUserDetails}
                decrypt={decrypt}
            />

            {showPopup === ADD_USER && <UserModel decrypt={decrypt} fetchUsers={fetchUsers} handleClickClose={() => setShowPopup(null)} />}

            {showPopup === EDIT_USER && <UserModel decrypt={decrypt} userData={selectedUserDetails} fetchUsers={fetchUsers} handleClickClose={() => setShowPopup(null)} />}
        </>
    );
}
