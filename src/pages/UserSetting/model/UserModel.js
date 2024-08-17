import React from "react";
import { InputFieldForm } from "../../../components/InputField";
import { useForm } from "react-hook-form";
import { ReactComponent as CloseIcon } from "../../../Assets/close.svg";
import { ErrorMessage } from "../../../components/Error/ErrorMessage";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Button from "../../../components/Button/Button";
import { CheckBox } from "../../../components/CheckBox/CheckBox";
import API from "../../../API/API";
import CryptoJS from "crypto-js";
import { roleMenuItem } from "../../../constants/constant";

export default function UserModel(props) {
    const { handleClickClose, fetchUsers, userData, decrypt } = props;

    function formatRole(userDataRoles) {
        return userDataRoles.reduce((acc, curr) => {
            acc[curr.role] = {
                read: curr.permissions.read,
                write: curr.permissions.write,
                delete: curr.permissions.delete,
            };
            return acc;
        }, {});
    }

    const {
        control,
        formState: { errors },
        setValue,
        watch,
        handleSubmit,
        setError,
    } = useForm({
        defaultValues: !!userData
            ? {
                  userName: userData.user_name,
                  mobileNumber: userData.mobile_number,
                  password: decrypt(userData.password),
                  selectedRole: userData.roles
                      .map((userRole) => {
                          const roleItem = roleMenuItem.find((item) => item.value === userRole.role);
                          return roleItem ? { label: roleItem.label, value: roleItem.value } : null;
                      })
                      .filter((item) => item !== null),
                  roles: formatRole(userData.roles),
              }
            : {},
    });

    const handleUserAction = async (data) => {
        !!userData ? updateUser(data) : createUser(data);
    };

    const createUser = async (data) => {
        const userRoles = watch("selectedRole")?.map((role) => {
            const permissions = watch(`roles.${role.value}`) || {};

            return {
                role: role.value,
                permissions: {
                    read: permissions.read || false,
                    write: permissions.write || false,
                    delete: permissions.delete || false,
                },
            };
        });

        const encryptedPassword = CryptoJS.AES.encrypt(data.password, process.env.REACT_APP_SECRET_KEY).toString();

        const requestData = {
            user_name: data.userName,
            password: encryptedPassword,
            mobile_number: data.mobileNumber,
            roles: userRoles,
        };

        try {
            const response = await API.post("/admin/users", requestData);

            if (response?.success) {
                fetchUsers();
                handleClickClose();
            } else {
                if (response?.response?.data?.message?.user_name) setError("userName", { message: response?.response?.data?.message?.user_name });
            }
        } catch (error) {
            console.error("API Error: ");
        }
    };

    const updateUser = async (data) => {
        const userRoles = watch("selectedRole")?.map((role) => {
            const permissions = watch(`roles.${role.value}`) || {};

            return {
                role: role.value,
                permissions: {
                    read: permissions.read || false,
                    write: permissions.write || false,
                    delete: permissions.delete || false,
                },
            };
        });

        const encryptedPassword = CryptoJS.AES.encrypt(data.password, process.env.REACT_APP_SECRET_KEY).toString();

        const requestData = {
            user_name: data.userName,
            password: encryptedPassword,
            mobile_number: data.mobileNumber,
            roles: userRoles,
        };

        try {
            const response = await API.put(`/admin/users/${userData._id}`, requestData);

            if (response?.success) {
                fetchUsers();
                handleClickClose();
            } else {
                if (response?.response?.data?.message?.user_name) setError("userName", { message: response?.response?.data?.message?.user_name });
            }
        } catch (error) {
            console.error("API Error: ");
        }
    };

    const handleSelectUserRole = (data) => {
        setValue("selectedRole", data);
    };

    const setIsChecked = (role, permissionType, isChecked) => {
        setValue(`roles.${role}.${permissionType}`, isChecked, { shouldValidate: true, shouldDirty: true });
    };

    return (
        <>
            <div className="fixed bg-black bg-opacity-50 inset-0 z-50 flex p-4 md:p-0 md:absolute md:z-[9] overflow-auto md:overflow-visible">
                <div className="max-w-[830px] w-full rounded-xl px-8 py-6 md:mt-0 md:w-full md:p-4 lg:max-w-[439px] md:max-w-full md:rounded-none bg-white m-auto">
                    <div className="flex flex-row justify-between items-center border-neutral-300 mb-6 lg:mb-4">
                        <div>
                            <span className="paragraph-large-medium">User</span>
                        </div>

                        <div onClick={handleClickClose} className="md:hidden cursor-pointer">
                            <CloseIcon />
                        </div>
                    </div>

                    <div className="flex flex-row items-center mb-8 lg:block md:mb-2">
                        <div className="w-1/2 mr-2 lg:w-full lg:mr-0 lg:mb-2 md:mb-4 relative">
                            <InputFieldForm
                                label="Enter user name"
                                placeholder="Enter user name"
                                name="userName"
                                control={control}
                                rules={{ required: "Please enter user name" }}
                            />

                            {errors?.userName && <ErrorMessage className="absolute -bottom-5" errors={errors?.userName} />}
                        </div>

                        <div className="w-1/2 ml-2 relative lg:w-full lg:ml-0">
                            <Dropdown
                                label="Select user role"
                                selectedItems={watch("selectedRole") ?? []}
                                placeholder="Select user role"
                                setSelectedItems={handleSelectUserRole}
                                menuItem={roleMenuItem}
                            />
                            {errors?.user_role && <ErrorMessage errors={errors?.user_role} />}
                        </div>
                    </div>

                    <div className="flex flex-row items-center mb-3.5 lg:block md:mb-2">
                        <div className="w-1/2 mr-2 lg:w-full lg:mr-0 lg:mb-2 md:mb-4">
                            <InputFieldForm label="Enter password" placeholder="Enter password" name="password" control={control} rules={{ required: "Please enter password" }} />

                            {errors?.password && <ErrorMessage errors={errors?.password} />}
                        </div>

                        <div className="w-1/2 ml-2 relative lg:w-full lg:ml-0 remove-spin-button">
                            <InputFieldForm
                                type="number"
                                label="Enter mobile number"
                                placeholder="Enter mobile number"
                                name="mobileNumber"
                                control={control}
                                rules={{ required: "Please enter mobileNumber" }}
                            />

                            {errors?.mobileNumber && <ErrorMessage errors={errors?.mobileNumber} />}
                        </div>
                    </div>

                    {watch("selectedRole")?.map((el, index) => {
                        return (
                            <div key={index} className="flex flex-row w-full justify-between mb-2">
                                <span className="text-lg text-neutral-700">{el.label} : </span>
                                <div className="flex flex-row items-center gap-4 ml-8">
                                    <CheckBox
                                        isChecked={watch(`roles.${el.value}.read`) ?? false}
                                        setIsChecked={(checked) => setIsChecked(el.value, "read", checked)}
                                        label="Read"
                                        paddingL="pl-2"
                                        optionId={`read${index}`}
                                    />
                                    <CheckBox
                                        isChecked={watch(`roles.${el.value}.write`) ?? false}
                                        setIsChecked={(checked) => setIsChecked(el.value, "write", checked)}
                                        label="Write"
                                        paddingL="pl-2"
                                        optionId={`write${index}`}
                                    />
                                    <CheckBox
                                        isChecked={watch(`roles.${el.value}.delete`) ?? false}
                                        setIsChecked={(checked) => setIsChecked(el.value, "delete", checked)}
                                        label="Delete"
                                        paddingL="pl-2"
                                        optionId={`delete${index}`}
                                    />
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex flex-row justify-between items-center md:fixed md:bottom-0 md:left-0 md:right-0 md:mb-0 md:shadow-dropShadow md:bg-white md:px-4 md:pt-2 md:pb-1">
                        <Button label="Save" onClick={handleSubmit(handleUserAction)} />
                    </div>
                </div>
            </div>
        </>
    );
}
