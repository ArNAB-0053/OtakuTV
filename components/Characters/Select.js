import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectLanguage = ({ lang }) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key={lang} value={lang.toLowerCase()}>
          {lang}
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectLanguage;
