import { createPortal } from "react-dom";

interface propsType {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = (props: propsType) => {
  const { open, onClose, children } = props;

  if (typeof document !== "undefined") {
    return createPortal(
      <div className={`fixed inset-0 z-40 ${open ? "" : "pointer-events-none"}`}>
        <div
          className={`fixed inset-0 w-full h-full bg-black ${open ? "opacity-40" : "pointer-events-none opacity-0"} transition-opacity duration-300 ease-in-out`}
          onClick={onClose}
        />

        <div className={`flex items-center min-h-screen px-4 py-8 ${open ? "opacity-100" : "pointer-events-none opacity-0"} transition-opacity duration-300 ease-in-out`}>
          {children}
        </div>
      </div>,
      document.body
    );
  } else {
    return null;
  }
};
