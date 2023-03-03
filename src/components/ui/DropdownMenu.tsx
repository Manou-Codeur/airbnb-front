import { createPortal } from "react-dom";

interface propsType {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const DropdownMenu = (props: propsType) => {
  const { open, onClose, children } = props;

  if (typeof document !== "undefined") {
    return createPortal(
      <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
        <div
          onClick={onClose}
          className={`flex relative container mx-auto items-center min-h-screen ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          } transition-opacity duration-300 ease-in-out`}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  } else {
    return null;
  }
};
