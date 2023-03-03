import { Checkbox } from "@comps";
import { useFilter } from "contexts/filter.context";
import { useRouter } from "next/router";
import type { FormEvent } from "react";

export const SearchBar = () => {
  const { search, setSearch, inTitle, inDescription, setInTitle, setInDescription } = useFilter();
  const router = useRouter();

  const handleSearchButton = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <form className="hidden lg:block" onSubmit={(e) => handleSearchButton(e)}>
      <div className="p-1 items-center gap-1 flex rounded-full border border-slate-200 dark:border-slate-700 shadow ">
        <input
          className="text-sm rounded-full px-4 py-2 dark:bg-slate-900 grow min-w-0"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Checkbox checked={inTitle} toggleCheck={() => setInTitle((prev) => !prev)} id="inTitle" label={"In title"} />
        <Checkbox checked={inDescription} toggleCheck={() => setInDescription((prev) => !prev)} label="In desc." id="inDescription" />
        <button type="submit" className="bg-red-500 rounded-full p-3">
          <svg
            className="text-white"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block", fill: "none", height: "12px", width: "12px", stroke: "currentColor", strokeWidth: 5.333333333333333, overflow: "visible" }}
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <g fill="none">
              <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
            </g>
          </svg>
        </button>
      </div>
    </form>
  );
};
