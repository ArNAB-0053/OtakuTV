import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, onSearchChange, searchwhat }) => {
  return (
    <span className="flex items-center justify-start bg-black/10 px-4 py-2 border border-solid border-[#47567c]">
      <FaSearch />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={`Search ${searchwhat}...`}
        className="w-full pl-2 rounded-full appearance-none outline-none bg-transparent"
      />
    </span>
  );
};

export default SearchBar;
