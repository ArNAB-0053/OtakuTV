import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  searchwhat,
  className = "flex w-full items-center justify-start  px-4 py-2 border border-solid border-white/50",
  iconColor,
  isVisible=''
}) => {
  return (
    <span className={className}>
      <FaSearch color={iconColor} className={isVisible} />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={`Search ${searchwhat}...`}
        className="w-full pl-2 rounded-full appearance-none outline-none bg-transparent border-none "
      />
    </span>
  );
};

export default SearchBar;
