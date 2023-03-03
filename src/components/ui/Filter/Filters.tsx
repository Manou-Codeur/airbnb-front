import { OtherFilter } from "./OtherFilter";
import { PlaceTypeFilter } from "./PlaceTypeFilter";

export const Filters = () => {
  return (
    <div className="flex flex-row items-center mb-6 gap-4">
      <div className="sm:w-10/12 xl:w-11/12">
        <PlaceTypeFilter />
      </div>
      <OtherFilter />
    </div>
  );
};
