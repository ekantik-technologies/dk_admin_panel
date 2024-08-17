import React from "react";
import { ReactComponent as CloseIcon } from "../../../Assets/close.svg";
import { InputFieldForm } from "../../../components/InputField";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../../components/Error/ErrorMessage";
import Button from "../../../components/Button/Button";
import API from "../../../API/API";

export default function ClientModel(props) {
    const { handleClickClose, clientData, fetchClientList } = props;

    const {
        control,
        formState: { errors },
        handleSubmit,
        setError,
    } = useForm({ defaultValues: { name: clientData?.name ?? "" } });

    console.log(`errors ==>`, errors);

    const updateClient = async (data) => {
        try {
            const response = await API.put(`/admin/clients/${clientData._id}`, data);

            if (response?.success) {
                fetchClientList();
                handleClickClose();
            } else {
                console.log(`response?.response?.data?.message ==>`, response?.response?.data?.message);

                if (response?.response?.data?.message?.client_name) {
                    setError("name", { message: response?.response?.data?.message?.client_name });
                }
            }
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const createClient = async (data) => {
        try {
            const response = await API.post("/admin/clients", data);

            if (response?.success) {
                fetchClientList();
                handleClickClose();
            } else {
                if (response?.response?.data?.message?.client_name) {
                    setError("name", { message: response?.response?.data?.message?.client_name });
                }
            }
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const handleSave = (data) => {
        !clientData ? createClient(data) : updateClient(data);
    };

    return (
        <>
            <div className="fixed bg-black bg-opacity-50 inset-0 z-50 flex p-4 md:p-0 md:absolute md:z-[9] overflow-auto md:overflow-visible">
                <div className="max-w-[450px] w-full rounded-xl px-8 py-6 md:mt-0 md:w-full md:p-4 lg:max-w-[439px] md:max-w-full md:rounded-none bg-white m-auto">
                    <div className="flex flex-row justify-between items-center border-neutral-300 mb-6 lg:mb-4">
                        <div>
                            <span className="paragraph-large-medium">User</span>
                        </div>

                        <div onClick={handleClickClose} className="md:hidden cursor-pointer">
                            <CloseIcon />
                        </div>
                    </div>

                    <InputFieldForm label="Enter client name" placeholder="Enter client name" name="name" control={control} rules={{ required: "Please enter client name" }} />

                    {errors?.name && <ErrorMessage className="" errors={errors?.name} />}

                    <div className="mt-24">
                        <Button label="Save" onClick={handleSubmit(handleSave)} />
                    </div>
                </div>
            </div>
        </>
    );
}
