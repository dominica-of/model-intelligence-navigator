
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star, Download, GitFork, Calendar, Building, Database } from 'lucide-react';

interface ModelCardProps {
  model: {
    id: string;
    external_id: string;
    name: string;
    display_name: string;
    description: string;
    model_type: string;
    license: string;
    stars: number;
    downloads: number;
    forks: number;
    parameter_count: number;
    model_size_gb: number;
    architecture: string;
    source_url: string;
    paper_url: string;
    demo_url: string;
    overall_score: number;
    popularity_score: number;
    quality_score: number;
    recency_score: number;
    published_date: string;
    scraped_at: string;
    institutions: { name: string } | null;
    data_sources: { name: string };
  };
}

export const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getModelTypeColor = (type: string) => {
    switch (type) {
      case 'language_model': return 'bg-blue-100 text-blue-800';
      case 'vision_model': return 'bg-green-100 text-green-800';
      case 'multimodal_model': return 'bg-purple-100 text-purple-800';
      case 'audio_model': return 'bg-orange-100 text-orange-800';
      case 'reinforcement_learning': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLicenseColor = (license: string) => {
    switch (license) {
      case 'mit': return 'bg-green-100 text-green-700';
      case 'apache_2_0': return 'bg-blue-100 text-blue-700';
      case 'proprietary': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
            {model.display_name || model.name}
          </CardTitle>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span className="font-medium">{model.overall_score}</span>
            <span className="text-xs">/100</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={getModelTypeColor(model.model_type)}>
            {model.model_type.replace('_', ' ')}
          </Badge>
          <Badge variant="outline" className={getLicenseColor(model.license)}>
            {model.license}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-3">
          {model.description || 'No description available'}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0 flex-1">
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">{formatNumber(model.stars)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4 text-blue-500" />
            <span className="font-medium">{formatNumber(model.downloads)}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{formatNumber(model.forks)}</span>
          </div>
        </div>

        {/* Model Details */}
        <div className="space-y-2 mb-4 text-sm">
          {model.parameter_count && (
            <div className="flex justify-between">
              <span className="text-gray-600">Parameters:</span>
              <span className="font-medium">{formatNumber(model.parameter_count)}</span>
            </div>
          )}
          {model.model_size_gb && (
            <div className="flex justify-between">
              <span className="text-gray-600">Size:</span>
              <span className="font-medium">{model.model_size_gb} GB</span>
            </div>
          )}
          {model.architecture && (
            <div className="flex justify-between">
              <span className="text-gray-600">Architecture:</span>
              <span className="font-medium">{model.architecture}</span>
            </div>
          )}
        </div>

        {/* Institution and Source */}
        <div className="space-y-2 mb-4 text-sm">
          {model.institutions && (
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{model.institutions.name}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{model.data_sources.name}</span>
          </div>
        </div>

        {/* Scores */}
        <div className="mb-4">
          <div className="text-xs text-gray-600 mb-2">Quality Scores:</div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-medium text-blue-600">{model.popularity_score}</div>
              <div className="text-gray-500">Popularity</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-green-600">{model.quality_score}</div>
              <div className="text-gray-500">Quality</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-purple-600">{model.recency_score}</div>
              <div className="text-gray-500">Recency</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => window.open(model.source_url, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            View
          </Button>
          {model.demo_url && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(model.demo_url, '_blank')}
            >
              Demo
            </Button>
          )}
          {model.paper_url && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(model.paper_url, '_blank')}
            >
              Paper
            </Button>
          )}
        </div>

        {/* Timestamps */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          <span>Scraped: {new Date(model.scraped_at).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};
