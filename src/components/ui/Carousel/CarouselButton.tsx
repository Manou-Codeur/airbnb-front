interface propsType {
  onClick: (e: any) => void;
  variant?: "left" | "right";
  hidden?: boolean;
  withBorder?: boolean;
  dropShadow?: boolean;
}

export const CarouselButton = (props: propsType) => {
  const { onClick, variant = "left", hidden = true, withBorder = false, dropShadow = false } = props;

  return (
    <>
      <button
        onClick={onClick}
        className={`bg-white p-2 rounded-full ${hidden ? "hidden" : ""} ${
          withBorder ? "border border-slate-400" : ""
        } group-hover:block z-20 absolute top-[50%] translate-y-[-50%] ${variant === "left" ? "left-2" : "right-2"} cursor-pointer opacity-70 hover:shadow-lg hover:opacity-100`}
      >
        {variant === "left" ? (
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{ color: "#222", display: "block", fill: "none", height: "12px", width: "12px", stroke: "currentcolor", strokeWidth: 4, overflow: "visible" }}
          >
            <g fill="none">
              <path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path>
            </g>
          </svg>
        ) : (
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style={{ color: "#222", display: "block", fill: "none", height: "12px", width: "12px", stroke: "currentcolor", strokeWidth: 4, overflow: "visible" }}
          >
            <g fill="none">
              <path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"></path>
            </g>
          </svg>
        )}
      </button>
      {dropShadow && (
        <div
          className={`absolute z-10 top-0 ${variant === "left" ? "left-0" : "right-0"} h-full w-20 ${
            variant === "left" ? "bg-gradient-to-r" : "bg-gradient-to-l"
          } from-white dark:from-slate-900 to-transparent`}
        >
          {" "}
        </div>
      )}
    </>
  );
};
