import { useFilter } from "contexts/filter.context";
import Image from "next/image";
import type { PlaceModel } from "services/place.service";
import { Carousel } from "../Carousel/Carousel";

export const PlaceCard = (props: PlaceModel) => {
  const { wishlist, toggleFromWishlist } = useFilter();

  return (
    <div className="cursor-pointer">
      <div className="relative">
        <Carousel withDots>
          {props.images.map((image, index) => (
            <div key={index} className="relative h-full w-full">
              <Image
                src={image}
                width={360}
                height={360}
                className="aspect-square object-cover"
                alt={"image number " + (index + 1) + " with the title: " + props.title + ". and a description: " + props.description}
              />
            </div>
          ))}
        </Carousel>
        <div
          className="absolute top-4 right-4"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFromWishlist(props._id);
          }}
        >
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            className={wishlist.indexOf(props._id) !== -1 ? "fill-current text-red-500" : "fill-current text-black/50"}
            stroke="white"
            strokeWidth={2}
            style={{ display: "block", height: "24px", width: "24px", overflow: "visible" }}
          >
            <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
          </svg>
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between items-center pt-2">
          <h2 className="font-semibold">{props.address.city + ", " + props.address.country}</h2>
          <p className="flex items-center gap-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path
                fillRule="evenodd"
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">{props.rate}</span>
          </p>
        </div>
        <div className="text-sm">
          <p className="text-slate-500 truncate">{props.description}</p>
          <p className="pt-1">
            <strong className="font-semibold">€ {props.pricing.perDay}</strong> day
          </p>
        </div>
      </div>
    </div>
  );
};
