import { useFilter } from "contexts/filter.context";
import { ChangeEvent, useMemo, useState } from "react";
import { maxCapacityValue, maxPriceValue } from "utils/defaultValues";
import { TextField } from "../Form";
import { Modal } from "../Modal";
import { RangeFilter } from "./RangeFilter";

export const OtherFilter = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { maxPrice, minPrice, setMaxPrice, setMinPrice, maxCapacity, minCapacity, setMaxCapacity, setMinCapacity } = useFilter();

  const changes = useMemo(() => {
    let changes = 0;
    if (maxPrice < maxPriceValue || minPrice > 0) changes++;
    if (maxCapacity < maxCapacityValue || minCapacity > 0) changes++;

    return changes;
  }, [maxPrice, minPrice, maxCapacity, minCapacity]);

  const toggleModal = () => {
    setOpen((prev: boolean) => !prev);
  };

  const clear = () => {
    toggleModal();
    setMinPrice(0);
    setMaxPrice(maxPriceValue);
    setMinCapacity(0);
    setMaxCapacity(maxCapacityValue);
  };

  return (
    <>
      <button
        className="relative w-full px-5 py-3 bg-transparent justify-center text-xs rounded-xl flex items-center gap-2 border border-slate-300 dark:border-slate-700"
        onClick={toggleModal}
      >
        {changes > 0 && (
          <div className="absolute grid place-items-center top-0 right-0 w-5 h-5 bottom-auto left-auto z-10 translate-x-2/4 -translate-y-1/2 rounded-full bg-slate-800 text-xs font-bold text-white dark:bg-slate-200 dark:text-slate-800">
            {changes}
          </div>
        )}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
        Filter
      </button>
      <Modal open={open} onClose={toggleModal}>
        <div className="relative w-full max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex p-4 justify-between items-center border-b border-slate-200 dark:border-gray-700">
            <button className="hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full p-2" onClick={toggleModal}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="font-semibold">Filters</h2>
            <div className="w-6" />
          </div>
          {/* Content */}
          <div className="px-8 max-h-vh overflow-y-auto">
            <RangeFilter
              idMax="maxPrice"
              idMin="minPrice"
              labelMax="Max price"
              labelMin="Min price"
              nameMax="maxPrice"
              nameMin="minPrice"
              onChangeMin={(e) => {
                if (parseInt(e.target.value) < maxPrice && parseInt(e.target.value) >= 0) setMinPrice(parseInt(e.target.value));
              }}
              onChangeMax={(e) => {
                if (parseInt(e.target.value) > minPrice && parseInt(e.target.value) <= maxPriceValue) setMaxPrice(parseInt(e.target.value));
              }}
              preInput={<span>€</span>}
              subtitle="The average price is € 100"
              title="Price"
              valueMax={maxPrice}
              valueMin={minPrice}
            />

            <div className="w-full border-b border-slate-200 dark:border-gray-700" />

            <RangeFilter
              idMax="maxCapacity"
              idMin="minCapacity"
              labelMax="Max capacity"
              labelMin="Min capacity"
              nameMax="maxCapacity"
              nameMin="minCapacity"
              onChangeMin={(e) => {
                if (parseInt(e.target.value) < maxCapacity && parseInt(e.target.value) >= 0) setMinCapacity(parseInt(e.target.value));
              }}
              onChangeMax={(e) => {
                if (parseInt(e.target.value) > minCapacity && parseInt(e.target.value) <= maxCapacityValue) setMaxCapacity(parseInt(e.target.value));
              }}
              preInput={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
              }
              subtitle="The average home capacity is 4"
              title="Capacity"
              valueMax={maxCapacity}
              valueMin={minCapacity}
            />
          </div>
          {/* Footer */}
          <div className="flex p-4 justify-between items-center border-t border-slate-200 dark:border-gray-700">
            <button className="hover:bg-slate-100 rounded-lg px-3 py-2 font-semibold underline dark:hover:bg-gray-800" onClick={clear}>
              Clear all
            </button>
            <button
              className="hover:bg-slate-900 bg-slate-800 text-white dark:bg-slate-300 dark:text-slate-800 dark:hover:bg-slate-200 rounded-lg px-5 py-3 font-semibold"
              onClick={toggleModal}
            >
              Show filtered homes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
