import { PlaceCard } from "./PlaceCard";
import type { PlaceModel } from "services/place.service";
import Link from "next/link";

interface propsType {
  places: PlaceModel[];
}

export const PlacesGrid = (props: propsType) => {
  const { places } = props;
  return (
    <div className="grid gap-6 grid-cols-1  xsm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {places.map((place: PlaceModel) => (
        <Link key={place._id} href={"/place/" + place._id}>
          <PlaceCard {...place} />
        </Link>
      ))}
    </div>
  );
};
