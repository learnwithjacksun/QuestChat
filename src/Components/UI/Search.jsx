import { useState } from "react";
import Icon from "./Icon";

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="relative">
        <div className="absolute h-9 w-9 flex-center top-1/2 -translate-y-1/2 left-1">
          <Icon styles="text-sub">search</Icon>
        </div>
        <input
          type="text"
          placeholder="Search user by name..."
          className="border-line border-2 placeholder:text-sub text-sm font-medium focus-within:border-sub pl-10 h-10 w-full rounded-lg bg-lighter"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </>
  );
};

export default Search;
