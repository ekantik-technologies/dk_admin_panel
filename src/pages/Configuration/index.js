import React, { useEffect } from "react";
import { InputFieldForm } from "../../components/InputField";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import API from "../../API/API";
import { ErrorMessage } from "../../components/Error/ErrorMessage";

export default function Index() {
    const {
        control,
        setValue,
        watch,
        setError,
        formState: { errors },
    } = useForm();

    const fetchBox = async () => {
        try {
            const response = await API.get("/admin/box");
            setValue("box", response.box);
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const fetchColor = async () => {
        try {
            const response = await API.get("/admin/color");
            setValue("color", response.color);
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    useEffect(() => {
        fetchBox();
        fetchColor();
    }, []);

    const deleteBox = async (id) => {
        try {
            const response = await API.delete(`/admin/box/${id}`, { data: id });
            if (response.success) {
                fetchBox();
            }
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const deleteColor = async (id) => {
        try {
            const response = await API.delete("/admin/color", { data: id });
            if (response.success) {
                fetchColor();
            }
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const editBox = async (id, name) => {
        try {
            const response = await API.put(`/admin/box/${id}`, { name });
            if (response.success) {
                fetchBox();
            }
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const editColor = async (id, name) => {
        try {
            const response = await API.put(`/admin/color/${id}`, { name });
            if (response.success) {
                fetchColor();
            }
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const createBox = async (name) => {
        try {
            const response = await API.post(`/admin/box`, { name });
            if (response.success) {
                fetchBox();
                setValue("newBox", "");
            }
        } catch (error) {
            setError("newBox", error.response.data);
            console.log(`error ==>`, error.response.data);
        }
    };

    const createColor = async (name) => {
        try {
            const response = await API.post(`/admin/color`, { name });
            if (!!response) {
                fetchColor();
                setValue("newColor", "");
            }
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    return (
        <>
            <div className="flex flex-row items-start gap-10 pb-5 border-b border-neutral-300">
                <h2 className="pt-3">Box</h2>

                <div className="flex flex-col gap-4">
                    {watch("box")?.map((el, index) => {
                        return (
                            <div key={index} className="flex flex-row gap-4">
                                <InputFieldForm control={control} name={`box.${index}.name`} placeholder="Enter box type" />

                                <div className="flex flex-row gap-2">
                                    <Button className="max-h-[42px]" label="Edit" onClick={() => editBox(el._id, watch(`box.${index}.name`))} />
                                    <Button className="max-h-[42px]" label="Delete" onClick={() => deleteBox(el._id)} />
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col">
                            <InputFieldForm control={control} name={`newBox`} placeholder="Enter box type" />

                            {errors.newBox && <ErrorMessage errors={errors.newBox} />}
                        </div>

                        <div className="flex flex-row gap-2">
                            <Button className="max-h-[42px]" label="Add box" onClick={() => createBox(watch("newBox"))} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-start gap-10 mt-5">
                <h2 className="pt-3">Color</h2>

                <div className="flex flex-col gap-4">
                    {watch("color")?.map((el, index) => {
                        return (
                            <div key={index} className="flex flex-row gap-4">
                                <InputFieldForm control={control} name={`color.${index}.name`} placeholder="Enter color" />

                                <div className="flex flex-row gap-2">
                                    <Button className="max-h-[42px]" label="Edit" onClick={() => editColor(el._id, watch(`color.${index}.name`))} />
                                    <Button className="max-h-[42px]" label="Delete" onClick={() => deleteColor(el._id)} />
                                </div>
                            </div>
                        );
                    })}

                    <div className="flex flex-row gap-4">
                        <InputFieldForm control={control} name={`newColor`} placeholder="Enter color" />

                        <div className="flex flex-row gap-2">
                            <Button className="max-h-[42px]" label="Add color" onClick={() => createColor(watch("newColor"))} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
