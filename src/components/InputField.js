import { Controller } from "react-hook-form";

export default function InputField(props) {
    const { label, onChange, type = "text", placeholder, value = "" } = props;

    return (
        <>
            <div className="flex flex-col gap-2">
                {label && <label htmlFor="">{label}</label>}
                <input type={type} onChange={onChange} value={value} className="border border-neutral-300 rounded-md py-3 px-4" placeholder={placeholder} />
            </div>
        </>
    );
}

export function InputFieldForm(props) {
    const { name, rules, label, placeholder, control, type } = props;

    return (
        <>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field }) => <InputField onChange={field.onChange} label={label} value={field.value ?? ""} type={type} placeholder={placeholder} />}
            />
        </>
    );
}
