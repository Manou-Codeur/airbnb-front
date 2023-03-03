import { useFilter } from "contexts/filter.context";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getPlaceTypes, PlaceTypeModel } from "services/placeType.service";
import { CarouselButton } from "../Carousel";

export const PlaceTypeFilter = () => {
  const [placeTypes, setPlaceTypes] = useState<Array<PlaceTypeModel>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);

  const { placeType, setPlaceType } = useFilter();

  useEffect(() => {
    async function fetchData() {
      const data = await getPlaceTypes();
      setPlaceTypes(data.placeTypes);
    }
    if (loading) fetchData();

    setLoading(false);
    return () => {
      setLoading(true);
    };
  }, [placeType, setPlaceType, placeTypes]);

  const togglePlaceType = (placeTypeId: string) => {
    if (placeType === placeTypeId) {
      setPlaceType("");
    } else {
      setPlaceType(placeTypeId);
    }
  };

  const scroll = (scrollOffset: number) => {
    if (ref.current !== null) {
      ref.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="w-full relative">
      <CarouselButton
        onClick={() => scroll(-200)}
        variant="left"
        dropShadow
        hidden={false}
        withBorder
      />
      <div
        className="overflow-hidden scroll-smooth flex flex-row gap-10 snap-mandatory snap-x"
        ref={ref}
      >
        <div className="snap-start min-w-pt"></div>
        {placeTypes.map((placeTypeEl, index) => (
          <div
            key={index}
            onClick={() => togglePlaceType(placeTypeEl._id)}
            className={`w-20 snap-start flex flex-col items-center pt-4 cursor-pointer ${
              placeType !== placeTypeEl._id && "opacity-60"
            } hover:opacity-100 ${
              placeTypeEl._id === placeType &&
              "after:bg-slate-900 dark:after:bg-white"
            } ${
              placeTypeEl._id !== placeType && "hover:after:bg-slate-300"
            } after:w-full after:h-0.5 after:mt-3`}
          >
            <div className="dark:bg-white rounded-md p-1">
              <Image
                width={24}
                height={24}
                src={placeTypeEl.image}
                alt={"place type with the title: " + placeTypeEl.name}
              />
            </div>
            <h1 className="text-xs whitespace-nowrap font-semibold mt-1">
              {placeTypeEl.name}
            </h1>
          </div>
        ))}
        <div className="snap-start min-w-pt"></div>
      </div>
      <CarouselButton
        onClick={() => scroll(200)}
        variant="right"
        dropShadow
        hidden={false}
        withBorder
      />
    </div>
  );
};
