
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface SearchFiltersProps {
  filters: {
    minStars: number;
    maxStars: number;
    minScore: number;
    institution: string;
    dataSource: string;
    license: string;
    tags: string[];
  };
  onFiltersChange: (filters: any) => void;
  institutions: { id: string; name: string }[];
  dataSources: { id: string; name: string }[];
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  institutions,
  dataSources
}) => {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = filters.tags.filter(tag => tag !== tagToRemove);
    updateFilter('tags', updatedTags);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stars Range */}
          <div className="space-y-2">
            <Label>Stars Range</Label>
            <div className="px-2">
              <Slider
                value={[filters.minStars, filters.maxStars]}
                onValueChange={([min, max]) => {
                  updateFilter('minStars', min);
                  updateFilter('maxStars', max);
                }}
                max={10000}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{filters.minStars}</span>
                <span>{filters.maxStars}</span>
              </div>
            </div>
          </div>

          {/* Minimum Score */}
          <div className="space-y-2">
            <Label>Minimum Overall Score</Label>
            <div className="px-2">
              <Slider
                value={[filters.minScore]}
                onValueChange={([value]) => updateFilter('minScore', value)}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1 text-center">
                {filters.minScore}
              </div>
            </div>
          </div>

          {/* Institution Filter */}
          <div className="space-y-2">
            <Label>Institution</Label>
            <Select value={filters.institution} onValueChange={(value) => updateFilter('institution', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Institutions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Institutions</SelectItem>
                {institutions.map((institution) => (
                  <SelectItem key={institution.id} value={institution.id}>
                    {institution.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Data Source Filter */}
          <div className="space-y-2">
            <Label>Data Source</Label>
            <Select value={filters.dataSource} onValueChange={(value) => updateFilter('dataSource', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {dataSources.map((source) => (
                  <SelectItem key={source.id} value={source.id}>
                    {source.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* License Filter */}
          <div className="space-y-2">
            <Label>License</Label>
            <Select value={filters.license} onValueChange={(value) => updateFilter('license', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Licenses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Licenses</SelectItem>
                <SelectItem value="mit">MIT</SelectItem>
                <SelectItem value="apache_2_0">Apache 2.0</SelectItem>
                <SelectItem value="gpl_3_0">GPL 3.0</SelectItem>
                <SelectItem value="bsd_3_clause">BSD 3-Clause</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
                <SelectItem value="proprietary">Proprietary</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Tags */}
        {filters.tags.length > 0 && (
          <div className="mt-4">
            <Label className="mb-2 block">Active Tags</Label>
            <div className="flex flex-wrap gap-2">
              {filters.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-500" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
