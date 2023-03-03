import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { maxCapacityValue, maxPriceValue } from "utils/defaultValues";

interface filterContextType {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  inTitle: boolean;
  setInTitle: Dispatch<SetStateAction<boolean>>;
  inDescription: boolean;
  setInDescription: Dispatch<SetStateAction<boolean>>;
  placeType: string;
  setPlaceType: Dispatch<SetStateAction<string>>;

  minPrice: number;
  setMinPrice: Dispatch<SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: Dispatch<SetStateAction<number>>;

  minCapacity: number;
  setMinCapacity: Dispatch<SetStateAction<number>>;
  maxCapacity: number;
  setMaxCapacity: Dispatch<SetStateAction<number>>;

  wishlist: Array<string>;
  setWishlist: Dispatch<SetStateAction<Array<string>>>;
  toggleFromWishlist: (id: string) => void;
}

const filterContextInitialValues: filterContextType = {
  search: "",
  setSearch: () => {},
  inTitle: true,
  setInTitle: () => {},
  inDescription: true,
  setInDescription: () => {},
  placeType: "",
  setPlaceType: () => {},

  minPrice: 0,
  setMinPrice: () => {},
  maxPrice: maxPriceValue,
  setMaxPrice: () => {},

  minCapacity: 0,
  setMinCapacity: () => {},
  maxCapacity: maxCapacityValue,
  setMaxCapacity: () => {},

  wishlist: [],
  setWishlist: () => {},
  toggleFromWishlist: (id: string) => {},
};

export const FilterContext = createContext<filterContextType>(filterContextInitialValues);

export const useFilter = () => {
  return useContext(FilterContext);
};

export function FilterProvider(props: { children: ReactNode }) {
  const { children } = props;
  const [search, setSearch] = useState<string>("");
  const [inTitle, setInTitle] = useState<boolean>(true);
  const [inDescription, setInDescription] = useState<boolean>(true);
  const [placeType, setPlaceType] = useState<string>("");

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(maxPriceValue);

  const [minCapacity, setMinCapacity] = useState<number>(0);
  const [maxCapacity, setMaxCapacity] = useState<number>(maxCapacityValue);

  const [wishlist, setWishlist] = useState<Array<string>>([]);

  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem("wishlist") || "[]"));
  }, []);

  const toggleFromWishlist = (id: string) => {
    let newWishlist = wishlist;

    if (newWishlist.includes(id)) {
      newWishlist = newWishlist.filter((item) => item !== id);
    } else {
      newWishlist = [...newWishlist, id];
    }

    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setWishlist(newWishlist);
  };

  const value = {
    search: search,
    setSearch: setSearch,
    inTitle: inTitle,
    setInTitle: setInTitle,
    inDescription: inDescription,
    setInDescription: setInDescription,
    placeType: placeType,
    setPlaceType: setPlaceType,

    minPrice: minPrice,
    setMinPrice: setMinPrice,
    maxPrice: maxPrice,
    setMaxPrice: setMaxPrice,

    minCapacity: minCapacity,
    setMinCapacity: setMinCapacity,
    maxCapacity: maxCapacity,
    setMaxCapacity: setMaxCapacity,

    wishlist: wishlist,
    setWishlist: setWishlist,
    toggleFromWishlist: toggleFromWishlist,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}
