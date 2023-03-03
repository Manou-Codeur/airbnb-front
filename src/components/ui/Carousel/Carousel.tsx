import { MouseEvent, ReactNode, useEffect, useState } from "react";
import { CarouselButton } from "./CarouselButton";

interface propsType {
  children: Array<ReactNode>;
  withDots?: boolean;
  show?: number;
  hidden?: boolean;
  withBorder?: boolean;
  dropShadow?: boolean;
}

export const Carousel = (props: propsType) => {
  const { children, withDots = false, show = 1, hidden = true, withBorder = false, dropShadow = false } = props;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [length, setLength] = useState<number>(children.length);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    if (currentIndex < length - show) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prev = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="w-full flex flex-col group">
      <div className="flex w-full h-full relative">
        <div className="overflow-hidden w-full rounded-md">
          {currentIndex !== 0 && <CarouselButton dropShadow={dropShadow} withBorder={withBorder} hidden={hidden} onClick={prev} variant="left" />}
          <div
            className={`flex transition-all h-full scrollbar-none [&>*]:w-${children.length < show ? "full" : `1/${show}`} [&>*]:object-cover [&>*]:shrink-0 [&>*]:grow`}
            style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
          >
            {children}
          </div>
          {currentIndex !== children.length - show && <CarouselButton dropShadow={dropShadow} withBorder={withBorder} hidden={hidden} onClick={next} variant="right" />}
        </div>
        {withDots && children.length > 1 && (
          <div className="justify-center hidden group-hover:flex absolute left-1/2 bottom-2 -translate-y-0 translate-x-[-50%]">
            {children.map((image, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  goToSlide(index);
                }}
                className="text-2xl cursor-pointer"
              >
                <span className={"block bg-white mx-0.5 rounded-full min-w-1.5 min-h-1.5 w-1.5 h-1.5" + (index !== currentIndex ? " opacity-60" : "")}> </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
