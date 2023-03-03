interface propsType {
  label: string;
  type?: "submit" | "button" | "reset" | undefined;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = (props: propsType) => {
  const { label, type, className = "", onClick, disabled = false } = props;

  return (
    <button className={"w-full px-4 py-3 bg-red-600 text-white rounded text-md hover:bg-red-500 " + className} disabled={disabled} onClick={onClick} type={type}>
      {label}
    </button>
  );
};
