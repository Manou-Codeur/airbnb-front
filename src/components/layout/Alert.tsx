import { useAlert } from "contexts/alert.context";
import { MouseEvent, useEffect } from "react";

interface propsType {
  type: "info" | "success" | "warning" | "error";
  message: string;
  open: boolean;
  close: (e?: MouseEvent) => void;
}

export default function Alert(props: propsType) {
  const { type = "warning", message, open, close } = props;

  const { handleClose } = useAlert();

  return (
    <div
      className={`rounded-xl text-white p-2 flex flex-row items-center gap-2 ${open ? "block" : "hidden"} transition-all ${
        type === "info" ? "bg-gray-700" : type === "success" ? "bg-green-600  dark:bg-green-800" : type === "warning" ? "bg-yellow-600" : "bg-red-500"
      }`}
    >
      <span onClick={(e) => handleClose(e as MouseEvent)} className="hover:bg-slate-200/20 cursor-pointer p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </span>
      <p className="mr-4">{message}</p>
    </div>
  );
}
