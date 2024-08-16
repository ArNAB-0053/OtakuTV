import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectOption = ({
  handleSelectChange,
  selectedLanguage,
  uniqueLanguagesArray,
}) => {
  return (
    <Select onValueChange={handleSelectChange} value={selectedLanguage}>
      <SelectTrigger className="w-[9rem]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All languages</SelectItem>{" "}
        {uniqueLanguagesArray.map((lang) => (
          <SelectItem key={lang} value={lang.toLowerCase()}>
            {lang}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectOption;
