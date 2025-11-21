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
    <InputGroup className="w-full max-w-lg">
      {/* Input field */}
      <InputGroupInput
        placeholder="Search for restaurants, cuisines, or dishes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Left icon addon */}
      <InputGroupAddon>
        <Search className="text-gray-400 w-5 h-5" />
      </InputGroupAddon>

      {/* Right search button addon */}
      {onSearch && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={onSearch}>Search</InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
