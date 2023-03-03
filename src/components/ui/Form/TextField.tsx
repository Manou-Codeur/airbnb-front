import { ChangeEventHandler } from "react";

interface propsType {
  name: string;
  id: string;
  label: string;
  change: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  type?: string;
  preInput?: JSX.Element;
  className?: string;
  value?: string | number | readonly string[] | undefined;
}

export const TextField = (props: propsType): JSX.Element => {
  const { name, id, label, change, placeholder, required = false, type = "text", preInput, className, value } = props;

  return (
    <div className={`rounded-lg border border-slate-400 flex flex-col px-2.5 py-1.5 group group-focus:outline-2 group-focus:outline${className ? " " + className : ""}`}>
      <label htmlFor={name} className="text-xs text-slate-500">
        {label}
      </label>
      <div className="flex flex-row items-center gap-2 w-full">
        {preInput && preInput}
        <input
          type={type}
          placeholder={placeholder || label}
          name={name}
          id={id}
          value={value}
          onChange={change}
          required={required}
          className={`outline-0 py-1${type === "number" ? " no-numbers" : ""} bg-transparent w-full`}
        />
      </div>
    </div>
  );
};
