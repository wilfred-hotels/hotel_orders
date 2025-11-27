import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  onSearch?: () => void;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  onSearch,
}: SearchBarProps) {
  return (
    <InputGroup className="w-full px-4 py-5 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] focus-visible:border-transparent">
      {/* Input field */}
      <InputGroupInput
        placeholder="Search for restaurants, cuisines, or dishes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full text-sm sm:text-base"
      />

      {/* Left icon addon */}
      <InputGroupAddon>
        <Search className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
      </InputGroupAddon>

      {/* Right search button addon */}
      {onSearch && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={onSearch} className="text-sm">
            Search
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
