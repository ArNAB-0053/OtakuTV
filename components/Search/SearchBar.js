import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  searchwhat,
  className = "flex w-full items-center justify-start bg-black/10 px-4 py-2 border border-solid border-[#47567c]",
  iconColor,
}) => {
  return (
    <span className={className}>
      <FaSearch color={iconColor} />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={`Search ${searchwhat}...`}
        className="w-full pl-2 rounded-full appearance-none outline-none bg-transparent "
      />
    </span>
  );
};

export default SearchBar;
