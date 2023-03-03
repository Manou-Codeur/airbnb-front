import { useEffect, useState } from "react";
import { getPlaces } from "services/place.service";
import { useFilter } from "contexts/filter.context";
import { Loading } from "@comps";
import { PlacesGrid } from "./PlacesGrid";
import type { PlaceModel } from "services/place.service";
import { maxCapacityValue, maxPriceValue } from "utils/defaultValues";

export const Places = () => {
  const [places, setPlaces] = useState<Array<PlaceModel>>([]);
  const [searchResult, setSearchResult] = useState<Array<PlaceModel>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { search, inTitle, inDescription, placeType, minPrice, maxPrice, minCapacity, maxCapacity } = useFilter();

  useEffect(() => {
    async function fetchData() {
      const data = await getPlaces();
      setPlaces(data.places);
    }
    if (loading) fetchData();

    let filteredPlaces = places;
    if (search.length > 0 && (inTitle || inDescription)) {
      filteredPlaces = filteredPlaces.filter(
        (e: PlaceModel) =>
          (inTitle && e.title.toLowerCase().indexOf(search.toLowerCase()) > -1) || (inDescription && e.description.toLowerCase().indexOf(search.toLowerCase()) > -1)
      );
    }
    if (placeType.length > 0) {
      filteredPlaces = filteredPlaces.filter((e: PlaceModel) => placeType && e.type._id === placeType);
    }
    if (minPrice > 0 || maxPrice < maxPriceValue) {
      filteredPlaces = filteredPlaces.filter((e: PlaceModel) => e.pricing.perDay >= minPrice && e.pricing.perDay <= maxPrice);
    }
    if (minCapacity > 0 || maxCapacity < maxCapacityValue) {
      filteredPlaces = filteredPlaces.filter((e: PlaceModel) => e.capacity >= minCapacity && e.capacity <= maxCapacity);
    }
    setSearchResult(filteredPlaces);

    setLoading(false);
    return () => {
      setLoading(true);
    };
  }, [search, inTitle, inDescription, places, placeType, minPrice, maxPrice, minCapacity, maxCapacity]);

  return loading ? (
    <Loading />
  ) : ((inTitle || inDescription) && search.length > 0) || placeType.length > 0 || minPrice > 0 || maxPrice < maxPriceValue || minCapacity > 0 || maxCapacity < maxCapacityValue ? (
    <>
      {search.length > 0 && (
        <>
          <h1 className="block text-xl font-bold mb-4">
            Search result for: <i>{"'" + search + "'"}</i>
            {inTitle && ", in title"}
            {inTitle && inDescription ? " & in description" : inDescription && ", in description"}
          </h1>
        </>
      )}
      {searchResult.length < 1 && <h2>Aucun résultat trouvé</h2>}
      <PlacesGrid places={searchResult} />
    </>
  ) : (
    <PlacesGrid places={places} />
  );
};
