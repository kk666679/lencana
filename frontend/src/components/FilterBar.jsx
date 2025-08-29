import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter } from 'lucide-react';
import { categories, rarities } from '../data/badges';

function FilterBar({ 
  searchTerm, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange, 
  selectedRarity, 
  onRarityChange,
  onClearFilters 
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="relative flex-1 w-full lg:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search badges..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        {/* Category Filter */}
        <div className="w-full lg:w-48">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rarity Filter */}
        <div className="w-full lg:w-48">
          <Select value={selectedRarity} onValueChange={onRarityChange}>
            <SelectTrigger>
              <SelectValue placeholder="Rarity" />
            </SelectTrigger>
            <SelectContent>
              {rarities.map((rarity) => (
                <SelectItem key={rarity} value={rarity}>
                  {rarity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters Button */}
        <Button 
          variant="outline" 
          onClick={onClearFilters}
          className="w-full lg:w-auto flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
}

export default FilterBar;

