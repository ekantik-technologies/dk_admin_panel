import React, { useEffect, useState } from "react";
import { ReactComponent as CloseIcon } from "../../../Assets/close.svg";
import { InputFieldForm } from "../../../components/InputField";
import { useForm, useFieldArray } from "react-hook-form";
import { ErrorMessage } from "../../../components/Error/ErrorMessage";
import Button from "../../../components/Button/Button";
import API from "../../../API/API";
import Select from "react-select";

export default function ProductModel(props) {
    const { selectedProductDetails, fetchProductList, handleClickClose } = props;

    const defaultValue = () => ({
        components: selectedProductDetails.components.map((el) => ({ component: { label: el.id.name, value: el.id._id }, quantity: el.quantity })),
        name: selectedProductDetails.name,
        quantity: selectedProductDetails.quantity,
        stickerNumber: selectedProductDetails.sticker_number,
        plasticBagNumber: selectedProductDetails.plastic_bag_number,
        stickerType: { label: selectedProductDetails.sticker.name, value: { _id: selectedProductDetails.sticker._id, name: selectedProductDetails.sticker.name } },
        plasticBagType: { label: selectedProductDetails.plastic_bag.name, value: { _id: selectedProductDetails.plastic_bag._id, name: selectedProductDetails.plastic_bag.name } },
        productInBox: selectedProductDetails.in_a_box,
        color: selectedProductDetails.color.map((el) => ({ label: el.name, value: { _id: el._id, name: el.name } })),
        cartoon: selectedProductDetails.cartoon.map((el) => ({ label: el.name, value: { _id: el._id, name: el.name } })),
        box: selectedProductDetails.box.map((el) => ({ label: el.name, value: { _id: el._id, name: el.name } })),
    });

    const {
        control,
        formState: { errors },
        handleSubmit,
        setError,
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            components: [{ component: null, quantity: "" }],
            ...(!!selectedProductDetails ? defaultValue() : {}),
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "components",
    });

    const [boxType, setBoxType] = useState([]);

    const [colorMenuItem, setColorMenuItem] = useState([]);

    const [cartoonMenuItem, setCartoonMenuItem] = useState([]);

    const [componentList, setComponentList] = useState([]);

    const fetchComponentList = async () => {
        try {
            const response = await API.get(`/inventory/machining/components?page=${1}`);
            setComponentList(response.components.map((el) => ({ label: el.name, value: el._id })));
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const updateComponent = async (data) => {
        try {
            const body = {
                name: data.name,
                color: data.color.map((el) => el.value._id),
                box: data.box.map((el) => el.value._id),
                plastic_bag_number: data.plasticBagNumber,
                plastic_bag: data.plasticBagType.value._id,
                quantity: data.quantity,
                in_a_box: data.productInBox,
                sticker_number: data.stickerNumber,
                sticker: data.stickerType.value._id,
                cartoon: data.cartoon.map((el) => el.value._id),
                components: data.components.map((el) => ({
                    id: el.component.value,
                    quantity: el.quantity,
                })),
            };
            const response = await API.put(`/product/${selectedProductDetails._id}`, body);

            if (response?.success) {
                fetchProductList();
                handleClickClose();
            }
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const createProduct = async (data) => {
        const body = {
            name: data.name,
            color: data.color.map((el) => el.value._id),
            box: data.box.map((el) => el.value._id),
            plastic_bag_number: data.plasticBagNumber,
            plastic_bag: data.plasticBagType.value._id,
            quantity: data.quantity,
            in_a_box: data.productInBox,
            sticker_number: data.stickerNumber,
            sticker: data.stickerType.value._id,
            cartoon: data.cartoon.map((el) => el.value._id),
            components: data.components.map((el) => ({
                id: el.component.value,
                quantity: el.quantity,
            })),
        };

        try {
            const response = await API.post("/product", body);

            if (response?.success) {
                console.log(`response ==>`, response);
                fetchProductList();
                handleClickClose();
            }
        } catch (error) {
            if (error?.response?.data?.message?.name) {
                setError("name", { message: error?.response?.data?.message?.name });
            }
        }
    };

    const handleSave = (data) => {
        !selectedProductDetails ? createProduct(data) : updateComponent(data);
    };

    const fetchBox = async () => {
        try {
            const response = await API.get(`/inventory/box/components?page=${1}`);
            setBoxType(response.components.map((el) => ({ label: el.name, value: el })));
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const [stickerMenuItem, setStickerMenuItem] = useState([]);

    const fetchSticker = async () => {
        try {
            const response = await API.get(`/inventory/sticker/components?page=${1}`);
            setStickerMenuItem(response.components.map((el) => ({ label: el.name, value: el })));
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const fetchColor = async () => {
        try {
            const response = await API.get("/admin/color");
            setColorMenuItem(response.color.map((el) => ({ label: el.name, value: el })));
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const [plasticBagMenuItem, setPlasticBagMenuItem] = useState([]);

    const fetchPlasticBag = async () => {
        try {
            const response = await API.get(`/inventory/plastic_bag/components?page=${1}`);

            setPlasticBagMenuItem(response.components.map((el) => ({ label: el.name, value: el })));
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    const fetchCartoonList = async () => {
        try {
            const response = await API.get(`/inventory/cartoon/components?page=${1}`);
            setCartoonMenuItem(response.components.map((el) => ({ label: el.name, value: el })));
        } catch (error) {
            console.log(`error ==>`, error);
        }
    };

    useEffect(() => {
        fetchBox();
        fetchColor();
        fetchSticker();
        fetchPlasticBag();
        fetchCartoonList();
        fetchComponentList();
    }, []);

    const handleSelectBoxType = (selectedBox) => {
        setValue("box", selectedBox);
    };

    const handleSelectColor = (selectedColor) => {
        setValue("color", selectedColor);
    };

    const handleChangeCartoon = (selectedCartoon) => {
        setValue("cartoon", selectedCartoon);
    };

    const handleChangePlasticBag = (selectedBag) => {
        setValue("plasticBagType", selectedBag);
    };

    const handleChangeSticker = (selectedSticker) => {
        setValue("stickerType", selectedSticker);
    };

    return (
        <>
            <div className="fixed bg-black bg-opacity-50 inset-0 z-50 flex p-4 md:p-0 md:absolute md:z-[9] overflow-auto md:overflow-visible">
                <div className="max-w-[450px] w-full rounded-xl px-8 py-6 md:mt-0 md:w-full md:p-4 lg:max-w-[439px] md:max-w-full md:rounded-none bg-white m-auto">
                    <div className="flex flex-row justify-between items-center border-neutral-300 mb-6 lg:mb-4">
                        <div>
                            <span className="paragraph-large-medium">Component</span>
                        </div>

                        <div onClick={handleClickClose} className="md:hidden cursor-pointer">
                            <CloseIcon />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <InputFieldForm
                            label="Enter product name"
                            placeholder="Enter product name"
                            name="name"
                            control={control}
                            rules={{ required: "Please enter product name" }}
                        />

                        {errors?.name && <ErrorMessage className="" errors={errors?.name} />}

                        <div className="">
                            <label>Select Color</label>
                            <Select
                                placeholder="Select color"
                                onChange={handleSelectColor}
                                isMulti={true}
                                value={watch("color")}
                                options={colorMenuItem?.filter((option) => !watch("color")?.some((selected) => selected.label === option.label))}
                            />
                        </div>

                        <div className="">
                            <span className="mb-0">Select Box</span>
                            <Select
                                placeholder="Select Box"
                                onChange={handleSelectBoxType}
                                value={watch("box")}
                                isMulti={true}
                                options={boxType?.filter((option) => !watch("box")?.some((selected) => selected.label === option.label))}
                            />
                        </div>

                        <div className="">
                            <span className="mb-0">Select Cartoon</span>
                            <Select
                                placeholder="Select Cartoon"
                                onChange={handleChangeCartoon}
                                value={watch("cartoon")}
                                isMulti={true}
                                options={cartoonMenuItem?.filter((option) => !watch("cartoon")?.some((selected) => selected.label === option.label))}
                            />
                        </div>

                        <div className="">
                            <span className="mb-0">Select Plastic Bag</span>
                            <Select placeholder="Select Plastic Bag" onChange={handleChangePlasticBag} value={watch("plasticBagType")} options={plasticBagMenuItem} />
                        </div>

                        <div className="">
                            <span className="mb-0">Select Sticker</span>
                            <Select placeholder="Select Sticker" onChange={handleChangeSticker} value={watch("stickerType")} options={stickerMenuItem} />
                        </div>

                        <InputFieldForm
                            type="number"
                            label="Enter Available Quantity"
                            placeholder="Enter Available Quantity"
                            name="quantity"
                            control={control}
                            rules={{ required: "Please enter quantity" }}
                        />

                        {errors?.quantity && <ErrorMessage className="" errors={errors?.quantity} />}

                        <InputFieldForm
                            type="number"
                            label="Enter sticker quantity"
                            placeholder="Enter sticker quantity"
                            name="stickerNumber"
                            control={control}
                            rules={{ required: "Please enter sticker quantity" }}
                        />

                        {errors?.stickerNumber && <ErrorMessage className="" errors={errors?.stickerNumber} />}

                        <InputFieldForm
                            type="number"
                            label="Enter plastic bag"
                            placeholder="Enter plastic bag quantity"
                            name="plasticBagNumber"
                            control={control}
                            rules={{ required: "Please enter plastic bag" }}
                        />

                        {errors?.plasticBagNumber && <ErrorMessage className="" errors={errors?.plasticBagNumber} />}

                        <InputFieldForm
                            type="number"
                            label="Enter number of product feet in single box"
                            placeholder="Enter number of product feet in single box"
                            name="productInBox"
                            control={control}
                            rules={{ required: "Please enter number of product feet in single box" }}
                        />

                        {/* Components Section */}
                        <div>
                            <label>Components</label>
                            {fields.map((item, index) => (
                                <div key={item.id} className="flex flex-row gap-4 mb-4 items-center">
                                    <div className="min-w-[50%] w-full">
                                        <Select
                                            placeholder="Select component"
                                            options={componentList}
                                            value={watch(`components.${index}.component`)}
                                            onChange={(selected) => setValue(`components.${index}.component`, selected)}
                                        />
                                    </div>
                                    <div className="max-w-[20%]">
                                        <InputFieldForm
                                            type="number"
                                            placeholder="Enter quantity"
                                            name={`components.${index}.quantity`}
                                            control={control}
                                            rules={{ required: "Please enter quantity" }}
                                        />
                                    </div>
                                    <div className="flex-none">
                                        <Button label="Remove" onClick={() => remove(index)} />
                                    </div>
                                </div>
                            ))}
                            <Button label="Add Component" onClick={() => append({ component: null, quantity: "" })} />
                        </div>
                    </div>

                    <div className="mt-24">
                        <Button label="Save" onClick={handleSubmit(handleSave)} />
                    </div>
                </div>
            </div>
        </>
    );
}
