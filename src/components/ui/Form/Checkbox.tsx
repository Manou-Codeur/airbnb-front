interface propsType {
  checked: boolean;
  toggleCheck: () => void;
  label: string;
  id: string;
}

export const Checkbox = (props: propsType) => {
  const { checked, toggleCheck, label, id } = props;
  return (
    <div className={"text-sm rounded-full py-2 " + (checked ? "bg-red-500 text-slate-50" : "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-50")}>
      <label htmlFor={id} className="cursor-pointer font-medium p-3 whitespace-nowrap">
        {label}
      </label>
      <input type="checkbox" id={id} className="hidden" checked={checked} onChange={toggleCheck}></input>
    </div>
  );
};
